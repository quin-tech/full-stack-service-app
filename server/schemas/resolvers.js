const { User, Service, Category, Order } = require('../models');
const { signToken, AuthenticationError, EmailFormatError } = require('../utils/auth');
require('dotenv').config();

// Obtain Stripe secret key from .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    users: async () => {
      return await User.find();
    },
    services: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Service.find(params).populate('category');
    },
    service: async (parent, { _id }) => {
      return await Service.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate([
          {
            path: 'orders.services',
            populate: 'category'
          },
          {
            path: 'services',
            populate: 'category'
          }
        ]);

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.services',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ services: args.services });
      const line_items = [];

      const { services } = await order.populate('services');

      for (let i = 0; i < services.length; i++) {
        const service = await stripe.products.create({
          name: services[i].name,
          description: services[i].description,
          images: [`${url}/images/${services[i].image}`]
        });

        const price = await stripe.prices.create({
          product: service.id,
          unit_amount: services[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      let {email, password, firstName, lastName} = args;

      // Check valid email format.
      const regex = new RegExp (/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-z\.]{2,6})$/);
      if (!regex.test(email)) {
        throw EmailFormatError;
      }

      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { services }, context) => {
      if (context.user) {
        const order = new Order({ services });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },
    addService: async (parent, { name, description, image, price, availability, contact, email, category }, context) => {
      if (context.user) {
        const service = await Service.create({ name, description, image, price, availability, contact, email, category, user: context.user._id });
        console.log(service);
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { services: service } }
        );

        return service;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    updateService: async (parent, { _id, price }) => {

      return await Service.findByIdAndUpdate(_id, price, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
