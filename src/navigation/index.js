import React from 'react'
import * as Icon from 'react-feather'

const navigation = [

  
  {
    title: 'Docs',
    items: [
      {
        url: '/chatbots',
        icon: <Icon.MessageCircle size={20} />,
        title: 'Chatbot',
        items: []
      },
      {
        url: '/user',
        icon: <Icon.User size={20} />,
        title: 'User Management',
        items: []
      },
      {
        url: '/organization',
        icon: <Icon.Anchor size={20} />,
        title: 'Organization Management',
        items: []
      },
      {
        url: '/permission',
        icon: <Icon.Anchor size={20} />,
        title: 'Permission Management',
        items: []
      },

    ]
  },

]
export default navigation
