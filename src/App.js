import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Alert, Button, Layout, Spin, Table } from 'antd'
import AddBook from './components/add-book/AddBook'
import './App.css'

class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout

    return (
      <Layout>
        <Header>
          <h1 style={{ color: 'white' }}>Client Example</h1>
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Books />

              <AddBook />
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Client Example by <a href="https://nandito.info">nandito</a>
        </Footer>
      </Layout>
    )
  }
}

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
      <div>
        <Button size="small">Update</Button>
        <Button size="small" type="danger">{record.id}</Button>
      </div>
    ),
  },
]

const Books = () => (
  <Query query={GET_BOOKS}>
    {({ loading, error, data }) => {
      if (loading)
        return <Spin />
      
      if (error)
        return <Alert message="Something went wrong." type="error" />
      
      if (!data.books.length)
        return <Alert message="There are no books." type="info" />

      return <Table dataSource={data.books} columns={columns} rowKey="id" />
    }}
  </Query>
)

const GET_BOOKS = gql`
  query getBooks {
    books {
      id
      author
      title
    }
  }
`

export default App
