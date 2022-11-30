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
    <div className="h-16 text-center items-center uppercase font-bold text-lg tracking-wider logo justify-center">
        <Link href="/dashboard">
          <a className="flex flex-row items-center justify-center">
            <img src={collapsed ? "/mtalkz-logo.png" : "/logo.png"} alt="Mtalkz Connect" style={{margin:"1rem",height:"2rem", width: "auto"}}/>
          </a>
        </Link>
    </div>
  )
}

export default Logo
