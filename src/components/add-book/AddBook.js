import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button, Modal, Form, Input, Spin, notification } from 'antd'

const FormItem = Form.Item

const BookCreateForm = Form.create()(
  class extends PureComponent {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="Add a new book"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Author">
              {getFieldDecorator('author', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the author of book!',
                  },
                ],
              })(
                <Input type="textarea" />
              )}
            </FormItem>

            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the title of book!',
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
          {this.props.isLoading && <Spin />}
        </Modal>
      )
    }
  }
)

class CollectionsPage extends PureComponent {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, { author, title }) => {
      if (err) {
        return
      }

      this.props.onAddBook({
        variables: {
          input: { author, title },
        }
      }).then(({ data }) => {
          notification.success({
            message: 'Book is added',
            description: `The ${title} by ${author} is successfully added.`,
          })
          form.resetFields()
          this.setState({ visible: false })
        })
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add book</Button>
          <BookCreateForm
            isLoading={this.props.isLoading}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
      </div>
    )
  }
}

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
      <CollectionsPage isLoading={loading} onAddBook={addBook} />
    )}
  </Mutation>
)
