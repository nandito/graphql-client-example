import gql from 'graphql-tag'

export const CREATE_BOOK = gql`
  mutation createBook($input:BookInput!){
    createBook(input: $input) {
      id
      author
      title
    }
  }
`

export const DELETE_BOOK = gql`
mutation deleteBook($id:ID!) {
  deleteBook(id: $id) {
    title
    author
    id
  }
}
`

export const UPDATE_BOOK = gql`
  mutation updateBook($id:ID!, $input:BookInput!) {
    updateBook(id: $id, input: $input) {
      title
      author
      id
    }
  }
`
