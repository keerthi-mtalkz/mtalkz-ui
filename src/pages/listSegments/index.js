import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import React from "react";
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import {ax} from "../../utils/apiCalls";
import Datatable from "../../components/datatable";
import DropdownWidget5 from '../../components/dropdown-widgets/dropdown-widget-5'
import { useRouter } from "next/router";
import ConfirmationModal from "../../components/confirmationmodal"
import {NotificationManager} from 'react-notifications'
import {Badge} from '../../components/badges'


const ListAndSegments=()=>{
    const router = useRouter();
    const [status, setStatus] = React.useState(undefined);
    const [searchList,setSerchList] = React.useState("")
    const [searchTag,setSerchTag] = React.useState("")
    const [showDeletePopup,setShowDeletePopup]=React.useState(false)
    const [deleteId,setDeleteId]=React.useState(undefined)
    const [listSegments,setListSegments]=React.useState([
      ]);

      const onItemClick=(name,operation)=>{
        if(operation=="Delete")
        {
            ConfirmationPopup(name)
        }
        

    }
    const ConfirmationPopup=(id)=>{
        setDeleteId(id)
        setShowDeletePopup(true)
       }
    
       const onCancel=()=>{
      setStatus(undefined)
        setShowDeletePopup(false)
    
       }
    
       const onSubmit=()=>{
        deleteListApi()
       }
    

    const columns =  [
        {
          Header: 'List',
          sortable: false,
        Cell: (data) => {

          return (<div >
              <div style={{color:"blue"}} className='font-semibold'>{data.row.original.name}</div>
              <span >{data.row.original.description}</span>

           </div>)}
        },
        {
          Header: 'Members',
          accessor: 'membersCount'
        },
        {
          Header: 'Created',
          accessor: 'created_at'
        },
        {
          Header:"Tags",
          sortable:false,
          Cell:(data)=>{
            return (<div className="flex  ">
            {
                data.row.original.tags.map((tag)=>{
                   return (
                    <div className='mr-2'>

                    <Badge  size={'default'} color="red" rounded >
                    {tag }
                  </Badge>
                  </div>
                   ) 
                })
            }
          
             </div>)}
        },
        {
            Header: 'Action',
            sortable: false,
          Cell: (data) => {
  
            return (<div className="flex  ">
           <DropdownWidget5 name={data.row.original.name} onItemClick={onItemClick}></DropdownWidget5>
             </div>)}
          },
      ]


       React.useEffect(()=>{
        getListsApi()
       },[])

       const handleSwitch=(value)=>{
      }
      
    {/*delete list api integration*/}
      const deleteListApi=()=>{
        const token = sessionStorage.getItem('token');
          ax.delete(`http://20.193.136.151:5000/lists/${deleteId}`, {headers: {
            'x-api-key ': `Bearer ${token}`
           }})
            .then((res) => {
              setShowDeletePopup(false)
              setStatus({ type: "success" });
              setTimeout(() => {
               setStatus(undefined);
               getListsApi();
              }, 1000);
            })
            .catch((err) => {
              setShowDeletePopup(false)
              setStatus({ type: "error",message: err.response.data.message });
              console.error("get /usres error", err.message);
            });
      
     }
   
    {/*get list api integration*/}
    const getListsApi=async(search=false)=>{
      const token= sessionStorage.getItem("token");
     let url=   "http://20.193.136.151:5000/lists/?like=false&skip=0&limit=10"
      if(search && searchTag != "" && searchList != "" )
      {
        url=`http://20.193.136.151:5000/lists/?name=${searchList}&like=true&tag=${searchTag}&skip=0&limit=10`
      }else if( search && searchList != "")
      {
        url = `http://20.193.136.151:5000/lists/?name=${searchList}&like=true&skip=0&limit=10`
      }else if(search && searchTag != "")
      {
        url =  `http://20.193.136.151:5000/lists/?&like=true&tag=${searchTag}&skip=0&limit=10`
      }
              await ax
                .get(url, {
                  headers: {
                    'x-api-key': `Bearer ${token}`
                  }
                })
                .then((res) => {
                    res.data.map((d)=>{
                        d.membersCount=d.customer_ids.length
                    })
                    setListSegments(res.data)
                    setSerchList("");
                    setSerchTag("")
                })
                .catch((err) => {
                
                });
               
           }

  return (
    <Layout className="overflow-x-scroll">
    {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Deleted user successfully', 'Success')}
        </div>
      </div>
      )}
        {status?.type === "error" && (
          <div className="flex flex-wrap w-full">
          <div className="p-2">
          { NotificationManager.error(status.message, 'Error')}
           
          </div>
        </div>
        )}
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

    <SectionTitle title="List & Segments" subtitle="" />
    <p>Below are your starred lists and segments. To view all your lists and segments or change the starred ones,
    <Link  href={`/#`} >
    <a style={{
        textDecoration: 'underline',
        color: 'blue',
        fontSize: 13
      }}>
       Click here.
      </a>
    </Link>
    </p> 
    {/*top selectors*/}
    <div className='flex mt-10 items-center mb-10'>
    <input
    name="search"
    type="text"
    style={{width:"250px", border: "1px solid"}}
    className="form-input mt-1 text-xs block w-full bg-white w-0.5 mr-5 border-solid -mt-1"
    placeholder="Search lists"
    onChange={(e)=>{setSerchList(e.target.value)}}
    value={searchList}
  >
  </input>
  
  <div  style={{width:"250px"}} className="mr-5">
  <input
  name="searchByTags"
  type="text"
  style={{width:"250px", border: "1px solid"}}
  className="form-input mt-1 text-xs block w-full bg-white w-0.5 mr-5 border-solid -mt-1"
  placeholder="Search Tags"
  onChange={(e)=>{setSerchTag(e.target.value)}}
  value={searchTag}
>
</input>
  </div>
  <div>
<input type={"button"}  style={{width:"100px",height:"40px",marginRight:"20px",background:"#434190",color:"white"}} onClick={()=>{getListsApi(true)}} value="Search"></input>

  </div>
<div>
<input type={"button"}  style={{width:"100px",height:"40px",marginRight:"20px",background:"#434190",color:"white"}} onClick={()=>{router.push('/listSegments/createListSegment')}} value="Create List"></input>
</div>
</div>
<Datatable columns={columns}  data={listSegments}></Datatable>

    </Layout>
    )
}

export default withRedux(ListAndSegments)
