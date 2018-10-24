import React, { Component } from 'react'
import { Col, Layout, Row } from 'antd'
import { AddBook, BookList } from './components'
import './App.css'

class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout

    return (
      <Layout style={{ display: 'flex', height: '100vh' }}>
        <Header>
          <Row type="flex" justify="space-between">
            <Col>
              <h1 style={{ color: 'white' }}>Client Example</h1>
            </Col>
            <Col>
              <AddBook />
            </Col>
          </Row>
        </Header>

        <Content style={{ background: '#fff', flex: '1 1 auto', margin: '0 50px', padding: '0 24px' }}>
          <Row style={{ margin: '24px auto'}}>
            <Col>
              <BookList />
            </Col>
          </Row>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Client Example by <a href="https://nandito.info">nandito</a>
        </Footer>
      </Layout>
    )
  }
}

export default App
