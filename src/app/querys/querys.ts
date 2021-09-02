import { gql } from 'apollo-angular';

export const QUERY_ACCOUNT = gql`
  query Query($accountByUserIdUserId: String!) {
    accountByUserId(userId: $accountByUserIdUserId) {
      balance
      lastChange
      userId
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  {
    products {
      productId
      storeId
      productName
      description
      price
      img
    }
  }
`;

export const QUERY_STORES = gql`
  {
    stores {
      storeId
      storeName
      description
      img
    }
  }
`;

export const QUERY_PRODUCTBYSTORE = gql`
  query Query($productsByStoreIdStoreId: String!) {
    productsByStoreId(storeId: $productsByStoreIdStoreId) {
      productId
      storeId
      productName
      description
      price
      img
    }
  }
`;

export const QUERY_ODERBYID = gql`
  query Query($orderByIdUserUserId: String!) {
    orderByIdUser(userId: $orderByIdUserUserId) {
      id
      idUser
      products {
        idProduct
        count
      }
      total
      dateOrder
    }
  }
`;

export const MUTATION_AUTHENTICATION = gql`
  mutation Mutation($authenticateCredentials: CredentialsInput!) {
    authenticate(credentials: $authenticateCredentials) {
      refresh
      access
    }
  }
`;

export const MUTATION_VERIFY = gql`
  mutation Mutation($verifyTokenToken: String!) {
    verifyToken(token: $verifyTokenToken) {
      UserId
    }
  }
`;

export const MUTATION_NEWORDER = gql`
  mutation Mutation($createOrderOrder: OrderInput!) {
    createOrder(order: $createOrderOrder) {
      id
      idUser
      products {
        idProduct
        count
      }
      total
      dateOrder
    }
  }
`;
