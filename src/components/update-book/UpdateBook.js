import React from 'react'
import { Mutation } from 'react-apollo'
import { BookFormModal } from '../../components'
import { UPDATE_BOOK } from '../../graphql'

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
