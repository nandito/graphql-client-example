import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button } from 'antd'

const DELETE_BOOK = gql`
mutation deleteBook($id:ID!) {
  deleteBook(id: $id) {
    title
    author
    id
  }
}
`

export default ({ id }) => (
  <Mutation mutation={DELETE_BOOK}>
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
