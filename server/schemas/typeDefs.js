const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Service {
    _id: ID
    name: String
    description: String
    image: String
    price: Int
    availability: String
    contact: String
    email: String
    category: String
    user: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    services: [Service]
  }

  type Listing {
    _id: ID
    listingDate: String
    services: [Service]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    listings: [Listing]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    services(category: ID, name: String): [Service]
    service(_id: ID!): Service
    users: [User]
    user: User
    order(_id: ID!): Order
    listing(_id: ID!): Listing
    checkout(services: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(services: [ID]!): Order
    addListing(services: [ID]!): Listing
    addService(name: String!, description: String!, image: String, price: Int, availability: String, contact: String, email: String, category: String ): Service
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateService(_id: ID!, price: Int!): Service
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
