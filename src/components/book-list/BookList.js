import React from 'react'
import { Query } from 'react-apollo'
import { Alert, Col, Row, Spin, Table } from 'antd'
import { DeleteBook, UpdateBook } from '../../components'
import { GET_BOOKS } from '../../graphql'

const columns = [
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Row type="flex" justify="center">
        <Col style={{ margin: '0 6px' }}>
          <UpdateBook book={record} />
        </Col>
        <Col style={{ margin: '0 6px' }}>
          <DeleteBook id={record.id} />
        </Col>
      </Row>
    ),
  },
]

export default () => (
  <Query query={GET_BOOKS}>
    {({ loading, error, data }) => {
      if (loading)
        return <Spin />

      if (error)
        return <Alert message="Something went wrong." type="error" />

      if (!data.books.length)
        return <Alert message="There are no books." type="info" />

      return (
        <Table
          dataSource={data.books}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      )
    }}
  </Query>
)
