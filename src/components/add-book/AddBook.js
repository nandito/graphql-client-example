import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import BookFormModal from '../book-form-modal/BookFormModal'

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
  <Mutation mutation={CREATE_BOOK}>
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
