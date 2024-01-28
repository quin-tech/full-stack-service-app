import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($services: [ID]!) {
    addOrder(services: $services) {
      purchaseDate
      services {
        _id
        name
        description
        image
        availability
        contact
        email
        price
        category {
          name
        }
        user {
          firstName
        }
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing($services: [ID]!) {
    addListing(services: $services) {
      listingDate
      services {
        _id
        name
        description
        image
        availability
        contact
        email
        price
        category {
          name
        }
        user {
          firstName
        }
      }
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService($name: String!, $description: String!, $image: String, $price: Int, $availability: String, $contact: String, $email: String, $category: String) {
    addService(name: $name, description: $description, image: $image, price: $price, availability: $availability, contact: $contact, email: $email, category: $category) {
      _id
      availability
      category
      contact
      description
      email
      image
      name
      price
      user
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
