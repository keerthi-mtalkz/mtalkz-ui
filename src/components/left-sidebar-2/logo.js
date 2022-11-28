import React from 'react'
import {ToggleLeft} from 'react-feather'
import {useSelector, shallowEqual} from 'react-redux'
import Link from 'next/link'

const Logo = () => {
  const {name, leftSidebar, collapsed} = useSelector(
    state => ({
      name: state.name,
      collapsed: state.collapsed,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  )
  return (
    <div
      className={`h-16 pt-5 text-center  items-center uppercase font-bold text-lg tracking-wider logo ${
        collapsed ? 'justify-center' : 'justify-between px-4'
      }`}  >
     
      {!collapsed ? (
        <Link href="/dashboard">
          <a className="flex flex-row items-center justify-start">
          <img
          src="/logo.png"
          alt="Mtalkz Connect"
          width="150px"
          height="100px"
        />
          </a>
        </Link>
      ):(
        <Link href="/dashboard">
          <a className="flex flex-row items-center justify-start">
          <img
          src="/mtalkz-logo.png"
          alt="Mtalkz Connect"
          width="30px"
          height="50px"
          style={{marginTop:"-10px", marginLeft:"14px"}}
        />
          </a>
        </Link>
      )}
    </div>
  )
}

export default Logo
