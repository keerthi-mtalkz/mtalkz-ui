import React, {useState, useEffect} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import * as Icon from 'react-feather'

const DropdownWidget5 = ({name,onItemClick,lastUploaded,data}) => {
  const {direction} = useSelector(
    state => ({
      direction: state.direction,
    }),
    shallowEqual
  )

  const [hidden, setHidden] = useState(true)
  const {user} = useSelector(
    state => ({
      user: state.user
    }),
    shallowEqual
  )
  const buttonRef = React.createRef()
  const dropdownRef = React.createRef()
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false
      }
      setHidden(!hidden)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, buttonRef])

  const items = [
   
  ]

  if(lastUploaded && lastUploaded.status == "queued"){
    items=[ {
      name: 'Cancel Upload',
    },
    {
      name: 'Edit List Attributes',
    },
    {
      name: 'Delete',
    }]
  }else{
    items=[ {
      name: 'Import Data',
    },
    {
      name: 'Edit List Attributes',
    },
    {
      name: 'Delete',
    }]
  }


  return (
    <div className="flex items-center justify-center w-8 mx-2">
      <div>
        <button
          ref={buttonRef}
          className="flex h-8 w-8 rounded-full ml-2 relative"
          onClick={() => setHidden(!hidden)}>
          <span className="absolute top-0 left-0 ">
            <Icon.Menu></Icon.Menu>
          </span>
        </button>
        <div
          ref={dropdownRef}
          className={`navbar-dropdown dropdown ${direction === 'ltr' ? 'dropdown-right' : 'dropdown-left'} w-48 ${
            hidden ? '' : 'open'
          }`}>
          <div className="w-48 dropdown-content">
            <div className="flex flex-col w-full">
              {items.map((item, i) => {
                if(lastUploaded){
  return  <div key={i} className="p-2 cursor-pointer bg-sky-500 hover:bg-sky-700" onClick={()=>{onItemClick(name,item.name,data)}}>
  <span style={{color: item.name=="Delete"?'red':'black'}}>{item.name}</span>
</div>
                }
                else{
             return     <div key={i} className="p-2 cursor-pointer bg-sky-500 hover:bg-sky-700" onClick={()=>{onItemClick(name,item.name,data)}}>
                  <span style={{color: item.name=="Delete"?'red':'black'}}>{item.name}</span>
              </div>
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownWidget5
