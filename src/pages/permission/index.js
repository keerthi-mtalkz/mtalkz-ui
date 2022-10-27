import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'

const Permission=()=>{
 const [permissions,setPermissions]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");


  const getPermissions = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setPermissions(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error", err });
        console.error("get /permissions error", err);
      });
  };


  React.useEffect(() => {
    getPermissions();
  }, []);

     const deletePermission = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/permissions/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            getPermissions();
        }, 1000);
      })
      .catch((err) => {
        console.error("get /permissions error", err.message);
        setStatus({ type: "error", err });
      });
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};


  const columns =  [
    {
      Header: 'ID',
      accessor: 'id'
    },
      {
        Header: 'Route',
        accessor: 'route'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> <Link href={`/permission/view/${data.row.original.id}`}>
        <a>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
        </a>
      </Link> <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => deletePermission(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/permission/update/${data.row.original.id}`}>
                    <a>
                      <p>
                        <i className="icon-note text-1xl font-bold mb-2"></i>
                      </p>
                    </a>
                  </Link>
</div>
        )}
       
      }
    ]
  return (
    <Layout>
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted permission successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(error, 'Error')}
         
        </div>
      </div>
      )}
      <div className="flex flex-row pb-4">
      <div className=" w-5/6">
        <input
          type="text"
          name="search"
          className="w-full p-2 ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="w-1/6 ">
        {" "}
        <Link href={`/permission/addPermission`}>
          <a>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add Permission
            </button>
          </a>
        </Link>
      </div>
    </div>
    <Datatable columns={columns} data={permissions} />
    </Layout>
    )
}

export default withRedux(Permission)
