import React from 'react'
import * as Icon from 'react-feather'

const navigation = [

  
  {
    title: '',
    items: [
      {
        url: '/chatbots',
        icon: <Icon.MessageCircle size={20} />,
        title: 'Chatbots',
        items: []
      },
      {
        url: '/listSegments',
        icon: <Icon.Users size={20} />,
        title: 'List & Segments',
        items: []
      },
      {
        url: '/user',
        icon: <Icon.User size={20} />,
        title: 'Users',
        items: []
      },
      {
        url: '/organization',
        icon: <Icon.Home size={20} />,
        title: 'Organizations',
        items: []
      },
      {
        url: '/role',
        icon: <Icon.Flag size={20} />,
        title: 'Roles',
        items: []
      },
      {
        url: '/permission',
        icon: <Icon.Lock size={20} />,
        title: 'Permissions',
        items: []
      },
      {
        url: '/channel',
        icon: <Icon.Speaker size={20} />,
        title: 'Channels',
        items: []
      },
      {
        url: '/resource',
        icon: <Icon.Grid size={20} />,
        title: 'Resources',
        items: []
      },
      {
        url: '/apiKey',
        icon: <Icon.Anchor size={20} />,
        title: 'API Keys Management',
        items: []
      },
      {
        url: '/integration',
        icon: <Icon.Paperclip size={20} />,
        title: 'Integrations',
        items: []
      },

    ]
  },

]
export default navigation
