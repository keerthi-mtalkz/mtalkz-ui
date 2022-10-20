import React from 'react'
import  Login from "./pages/login"
import Link from 'next/link'
import Layout from '../layouts/empty'
import {withRedux} from '../lib/redux'  
import ChangeDirection from '../components/change-direction'
import Logo from '../components/landing/logo'
import Icons from '../components/landing/icons'
import Images from '../components/landing/images'
import Title from '../components/landing/title'
import Text from '../components/landing/text'
import Features from '../components/landing/features'
import Options from '../components/landing/options'
import Screenshots from '../components/landing/screenshots'
import Sidebars from '../components/landing/sidebars'

const Index = () => (
  <Layout>
     <Login></Login>
  </Layout>
)

export default withRedux(Index)
