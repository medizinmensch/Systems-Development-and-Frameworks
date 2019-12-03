import gql from 'graphql-tag'
import graphlql from 'graphql'

export const ALL_ITEMS_QUERY = gql`
    query itemsQuery {
        items {
            id
            text
            editMode
        }
    }
`;

export const CREATE_ENTRY = gql`
    mutation createEntry($text: String!) {
        createEntry(text: $text) {
            id
            text
            editMode
        }
    }
`;

export const DELETE_ENTRY = gql`
    mutation DeleteEntry($id: String!) {
        deleteEntry(id: $id)
    }
`;

export const LOGIN = gql`
        mutation login($email: String!, $password:String!) {
            login(email: $email, password: $password)
        }
    `;

export const REGISTER = gql`
        mutation register($email: String!, $password:String!) {
            register(email: $email, password: $password)
        }
    `;