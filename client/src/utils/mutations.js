import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            _id
            username

        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user{
            _id
            username
        }
    }
}
`;

export const SAVE_STOCK = gql`
mutation saveStock($stockData: StockInput!){
    saveStock(stockData: $stockData){
        _id
        username
        email
        savedStocks{
           ticker
           name
        }
    }
}
`;

export const REMOVE_BOOK= gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        saveBooks{
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`;
