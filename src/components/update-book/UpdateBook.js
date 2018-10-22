import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import BookFormModal from '../book-form-modal/BookFormModal'

const UPDATE_BOOK = gql`
mutation updateBook($id:ID!, $input:BookInput!) {
  updateBook(id: $id, input: $input) {
    title
    author
    id
  }
}
`

export default ({ book }) => (
  <Mutation mutation={UPDATE_BOOK}>
    {(updateBook, { loading }) => (
      <BookFormModal
        defaultValues={book}
        isLoading={loading}
        onSubmit={updateBook}
        modalTitle="Edit book"
        modalSubmitText="Update"
        triggerButtonLabel="Update"
        triggerButtonProps={{ size: 'small' }}
      />
    )}
  </Mutation>
)
