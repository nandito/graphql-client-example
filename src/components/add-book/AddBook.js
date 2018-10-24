import React from 'react'
import { Mutation } from 'react-apollo'
import { BookFormModal } from '../../components'
import { CREATE_BOOK, GET_BOOKS } from '../../graphql'

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
