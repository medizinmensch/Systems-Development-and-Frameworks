import gql from 'graphql-tag'

export const LOGIN = gql`
    mutation login($email: String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            user
        }
    }
`;

export const ALL_SONGS_QUERY = gql`
    query songsQueryPaginated($size: Int, $page: Int) {
        songs(size: $size, page: $page) {
            id
            name
            createdAt
            modifiedAt
            user {
                name
            }
        }
    }
`;

export const CREATE_SONG = gql`
    mutation createSong($name: String!) {
        createSong(name: $name) {
            id
            name
            createdAt
            user {
                name
            }
        }
    }
`;

export const UPDATE_SONG = gql`
    mutation updateSong($id: String!, $name: String!){
        updateSong(id: $id, name: $name){
            id
            name
            createdAt
            modifiedAt
            user {
                name
            }
        }
    }
`;

export const DELETE_SONG = gql`
    mutation DeleteSong($id: String!) {
        deleteSong(id: $id)
    }
`;
