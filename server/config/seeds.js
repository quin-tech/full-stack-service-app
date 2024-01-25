const db = require('./connection');
const { User, Service, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Service', 'services');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Delivery' },
    { name: 'Home Repairs' },
    { name: 'Cleaning' },
    { name: 'Moving' },
    { name: 'Gardening-Outdoor' },
    { name: 'Assembly' },
    { name: 'Shopping-Errands' },
    { name: 'Dog Walking' },
    { name: 'Pet Sitting' },
  ]);

  console.log('categories seeded');

  const services = await Service.insertMany([
    {
      name: 'Speedy Delivery',
      description:
        'We deliver anything that can fit in the van and is legal',
      image: 'home-store-front-door.jpg',
      category: categories[0]._id,
      price: 100.00,
      contact: 'Jane Johnson',
      email: 'Jane@email.com',
      availability: '2024-02-10T08:00Z'
    },
    {
      name: 'Antique Movers',
      description:
        'Expert packing / fully bonded and insured / careful as if it was our own',
      image: 'home-store-front-door.jpg',
      category: categories[0]._id,
      price: 175.00,
      contact: 'Tim Thomas',
      email: 'Tim@email.com',
      availability: '2024-02-12T10:30Z'
    },
    {
      name: 'The Fixers',
      description:
        'Small repairs in the home: appliances, walls, non-union plumbing and electrical, clean gutters, painting',
      image: 'home-store-front-door.jpg',
      category: categories[1]._id,
      price: 300.00,
      contact: 'Greta Gershwin',
      email: 'Greta@email.com',
      availability: '2024-02-14T07:00Z'
    },
    {
      name: 'Floor Renewal',
      description:
        'Specialize in wood floor renovation, carpet replacement and carpet cleaning.',
      image: 'home-store-front-door.jpg',
      category: categories[1]._id,
      price: 400.00,
      contact: 'Fred Fauntleroy',
      email: 'Fred@email.com',
      availability: '2024-02-16T12:00Z'
    },
    {
      name: 'See It Sparkle',
      description:
        'Full house cleaning and custom house cleaning available.',
      image: 'home-store-front-door.jpg',
      category: categories[2]._id,
      price: 150.00,
      contact: 'Eva Edwards',
      email: 'Eva@email.com',
      availability: '2024-02-18T14:30Z'

    },
    {
      name: 'McCormick Movers',
      description:
        'Small jobs / Big jobs / Local home moves',
      image: 'home-store-front-door.jpg',
      category: categories[3]._id,
      price: 3000.00,
      contact: 'Mark McCormick',
      email: 'Mark@email.com',
      availability: '2024-02-20T10:00Z'
    },
    {
      name: 'Green Thumb Landscaping',
      description:
        'Weekly maintance / home outdoor projects / tree trimming and removal.',
      image: 'home-store-front-door.jpg',
      category: categories[4]._id,
      price: 400.00,
      contact: 'Wendy Washington',
      email: 'Wendy@email.com',
      availability: '2024-02-22T17:00Z'
    },
    {
      name: 'Assembly Experts',
      description:
        'My buddies say Diversify - would yeh?  I say, No way man - I live for putting things together!',
      image: 'home-store-front-door.jpg',
      category: categories[5]._id,
      price: 75.00,
      contact: 'Bert Brown',
      email: 'Bert@email.com',
      availability: '2024-02-24T14:00Z'
    },
    {
      name: 'Healthy Food Express',
      description:
        'Phone orders / Online orders / Pickup what you order.',
      image: 'home-store-front-door.jpg',
      category: categories[6]._id,
      price: 40.00,
      contact: 'Polly Peterson',
      email: 'Polly@email.com',
      availability: '2024-02-26T16:30Z'
    },
    {
      name: 'Bouquet Delivery',
      description:
        'In-store stock of beautiful bouquets and some live plants, or Order online or by phone. Visit our website / Same day delivery',
      image: 'home-store-front-door.jpg',
      category: categories[6]._id,
      price: 200.00,
      contact: 'Alan Anderson',
      email: 'Alan@email.com',
      availability: '2024-02-28T18:00Z'
    },
    {
      name: 'Happy Hound Dog Walking',
      description:
        '15 years experience in the business / Trained and background-checked walkers / Any size dogs.',
      image: 'home-store-front-door.jpg',
      category: categories[7]._id,
      price: 50.00,
      contact: 'Judith Jenkins',
      email: 'Judith@email.com',
      availability: '2024-03-03T09:00Z'
    },
    {
      name: 'Home-Pet-Care.com',
      description:
        'Contact us online / 5 years experience with dogs, cats, and 10 other types of pets / fully insured.',
      image: 'home-store-front-door.jpg',
      category: categories[8]._id,
      price: 70.00,
      contact: 'Sally Smith',
      email: 'Sally@email.com',
      availability: '2024-03-05T11:30Z'
    },
  ]);

  console.log('services seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        services: [services[0]._id, services[0]._id, services[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
