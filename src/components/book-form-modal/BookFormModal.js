import React, { PureComponent } from 'react'
import { Button, Modal, Form, Input, Spin, notification } from 'antd'

const FormItem = Form.Item

const BookForm = Form.create()(
  class extends PureComponent {
    render() {
      const {
        defaultValues = {},
        form,
        modalSubmitText,
        modalTitle,
        onCancel,
        onSubmit,
        visible,
      } = this.props

      const { getFieldDecorator } = form

      return (
        <Modal
          onCancel={onCancel}
          onOk={onSubmit}
          okText={modalSubmitText}
          title={modalTitle}
          visible={visible}
        >
          <Form layout="vertical">
            { defaultValues.id && (
              <FormItem label="ID">
                {getFieldDecorator('id', {
                  initialValue: defaultValues.id,
                })(
                  <Input disabled />
                )}
              </FormItem>
            )}
            <FormItem label="Author">
              {getFieldDecorator('author', {
                initialValue: defaultValues.author,
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
                initialValue: defaultValues.title,
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
    form.validateFields((err, { author, id, title }) => {
      if (err) {
        return
      }

      this.props.onSubmit({
        variables: {
          id,
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
    const {
      defaultValues,
      isLoading,
      modalTitle,
      modalSubmitText,
      triggerButtonLabel,
      triggerButtonProps,
    } = this.props

    return (
      <>
        <Button onClick={this.showModal} {...triggerButtonProps}>
          {triggerButtonLabel}
        </Button>

        <BookForm
          defaultValues={defaultValues}
          isLoading={isLoading}
          modalTitle={modalTitle}
          modalSubmitText={modalSubmitText}
          onCancel={this.handleCancel}
          onSubmit={this.handleCreate}
          visible={this.state.visible}
          wrappedComponentRef={this.saveFormRef}
        />
      </>
    )
  }
}

export default BookFormModal
