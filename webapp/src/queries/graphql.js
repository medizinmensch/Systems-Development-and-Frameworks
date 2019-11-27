import gql from 'graphql-tag'

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