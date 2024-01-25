import { gql } from '@apollo/client';

export const QUERY_SERVICES = gql`
  query getServices($category: ID) {
    services(category: $category) {
      _id
      name
      description
      image
      availability
      contact
      email
      price
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($services: [ID]!) {
    checkout(services: $services) {
      session
    }
  }
`;

export const QUERY_ALL_SERVICES = gql`
  {
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
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
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
        }
      }
    }
  }
`;
