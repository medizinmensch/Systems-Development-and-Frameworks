import gql from 'graphql-tag'

export const ALL_TODOS_QUERY = gql`
    query todosQuery {
        todos {
            id
            text
            user
        }
    }
`;

export const CREATE_TODO = gql`
    mutation createEntry($text: String!) {
        createEntry(text: $text) {
            id
            text
            user
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteEntry($id: String!) {
        deleteEntry(id: $id)
    }
`;

export const LOGIN = gql`
        mutation login($email: String!, $password:String!) {
            login(email: $email, password: $password) {
                token
                user
            }
        }
    `;
