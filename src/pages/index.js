import React from 'react'
import Login from "./pages/login"
import Layout from '../layouts/empty'
import {withRedux} from '../lib/redux'  

const Index = () => (
  <Layout>
     <Login></Login>
  </Layout>
)

export default withRedux(Index)
