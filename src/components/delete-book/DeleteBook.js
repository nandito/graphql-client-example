import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from 'antd'
import { DELETE_BOOK, GET_BOOKS } from '../../graphql'

export default ({ id }) => (
  <Mutation
    mutation={DELETE_BOOK}
    update={(cache, { data }) => {
      const remainingBooks = data.deleteBook

      cache.writeQuery({
        query: GET_BOOKS,
        data: { books: remainingBooks }
      })
    }}
  >
    {(deleteBook, { loading }) => (
      <Button
        disabled={loading}
        size="small"
        type="danger"
        onClick={() => { deleteBook({ variables: { id } }) }}
      >
        Delete
      </Button>
    )}
  </Mutation>
)
