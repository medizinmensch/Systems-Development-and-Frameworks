import gql from 'graphql-tag'

export const LOGIN = gql`
    mutation login($email: String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            user
        }
    }
`;

export const ALL_TODOS_QUERY = gql`
    query todosQueryPaginated($size: Int, $page: Int) {
        todos(size: $size, page: $page) {
            id
            text
            user {
                name
            }
        }
    }
`;

export const CREATE_TODO = gql`
    mutation createTodo($text: String!) {
        createTodo(text: $text) {
            id
            text
            user {
                name
            }
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation updateTodo($id: String!, $text: String!){
        updateTodo(id: $id, text: $text){
            id
            text
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: String!) {
        deleteTodo(id: $id)
    }
`;
