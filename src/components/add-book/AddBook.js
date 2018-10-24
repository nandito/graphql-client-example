import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import BookFormModal from '../book-form-modal/BookFormModal'
import { GET_BOOKS } from '../book-list/BookList'

const CREATE_BOOK = gql`
  mutation createBook($input:BookInput!){
    createBook(input: $input) {
      id
      author
      title
    }
  }
`

export default () => (
  <Mutation
    mutation={CREATE_BOOK}
    update={(cache, { data }) => {
      const newBook = data.createBook
      const { books } = cache.readQuery({ query: GET_BOOKS })

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: books.concat([newBook]) }
      })
    }}
  >
    {(addBook, { loading }) => (
      <BookFormModal
        isLoading={loading}
        onSubmit={addBook}
        modalTitle="Add a new book"
        modalSubmitText="Add"
        triggerButtonLabel="Add book"
        triggerButtonProps={{ type: 'primary' }}
      />
    )}
  </Mutation>
)
