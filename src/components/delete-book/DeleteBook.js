import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from 'antd'
import { DELETE_BOOK } from '../../graphql'

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
