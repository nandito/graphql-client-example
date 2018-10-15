import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'

class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout

    return (
      <Layout>
        <Header>Client Example</Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              Content
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

export default App
