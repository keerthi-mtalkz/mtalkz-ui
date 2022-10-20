import React, {useState, useEffect} from 'react'
import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import {NotificationManager} from 'react-notifications'

const Dashboard1 = () => {
  const [message, didShow] = useState(false)
  useEffect(() => {
    if(message) return
    NotificationManager.info('You have 5 new messages', null, 1500)
    didShow(true)
  }, [message])
  return (
    <Layout>
      <div className="w-full lg:px-2">
       

        
      </div>
    </Layout>
  )
}
export default withRedux(Dashboard1)
