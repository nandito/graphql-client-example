import React, { PureComponent } from 'react'
import { Button, Modal, Form, Input, Spin, notification } from 'antd'

const FormItem = Form.Item

const BookForm = Form.create()(
  class extends PureComponent {
    render() {
      const { form, modalSubmitText, modalTitle, onCancel, onSubmit, visible } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title={modalTitle}
          okText={modalSubmitText}
          onCancel={onCancel}
          onOk={onSubmit}
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

class BookFormModal extends PureComponent {
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

      this.props.onSubmit({
        variables: {
          input: { author, title },
        }
      }).then(({ data }) => {
        notification.success({
          message: 'Book is saved',
          description: `The ${title} by ${author} is successfully saved.`,
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
    const { isLoading, modalTitle, modalSubmitText, triggerButtonLabel, triggerButtonProps } = this.props

    return (
      <div>
        <Button onClick={this.showModal} {...triggerButtonProps}>
          {triggerButtonLabel}
        </Button>

        <BookForm
          isLoading={isLoading}
          modalTitle={modalTitle}
          modalSubmitText={modalSubmitText}
          onCancel={this.handleCancel}
          onSubmit={this.handleCreate}
          visible={this.state.visible}
          wrappedComponentRef={this.saveFormRef}
        />
      </div>
    )
  }
}

export default BookFormModal
