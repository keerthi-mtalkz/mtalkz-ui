import React from 'react'
import * as Icon from 'react-feather'

const navigation = [

  
  {
    title: '',
    items: [
      {
        url: '/chat-bots',
        index:"chatbots.index",
        icon: <Icon.MessageCircle size={20} />,
        title: 'Chatbots',
        items: []
      },
      {
        url: '/user',
        index:"users.index",
        icon: <Icon.User size={20} />,
        title: 'Users',
        items: []
      },
      {
        url: '/listSegments',
        index:"users.index",
        icon: <Icon.User size={20} />,
        title: 'List & Segments',
        items: []
      },
      {
        url: '/organization',
        index:"organizations.index",
        icon: <Icon.Home size={20} />,
        title: 'Organizations',
        items: []
      },
      {
        url: '/campaign',
        index:"users.index",
        icon: <Icon.User size={20} />,
        title: 'Campaign',
        items: []
      },
      {
        url: '/role',
        index:"roles.index",
        icon: <Icon.Flag size={20} />,
        title: 'Roles',
        items: []
      },
      {
        url: '/permission',
        index:"permissions.index",
        icon: <Icon.Lock size={20} />,
        title: 'Permissions',
        items: []
      },
      {
        url: '/voice-campaign',
        index:"voice-campaigns.index",
        icon: <Icon.Volume2 size={20} />,
        title: 'Voice Campaign',
        items: []
      },
      {
        url: '/channel',
        index:"channels.index",
        icon: <Icon.Speaker size={20} />,
        title: 'Channels',
        items: []
      },
      {
        url: '/resource',
        index:"resources.index",
        icon: <Icon.Grid size={20} />,
        title: 'Resources',
        items: []
      },
      {
        url: '/apiKey',
        index:"api-keys.index",
        icon: <Icon.Anchor size={20} />,
        title: 'API Keys Management',
        items: []
      },
      {
        url: '/integration',
        index:"integrations.index",
        icon: <Icon.Paperclip size={20} />,
        title: 'Integrations',
        items: []
      },

    ]
  },

]
export default navigation
