import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import App from './App'

const client = new ApolloClient({
  uri: "http://localhost:4000"
})

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
