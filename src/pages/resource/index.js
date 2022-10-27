import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'

const Resource=()=>{
 const [resources,setResources]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");


  const getResources = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/resources", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error", err });
        console.error("get /Resources error", err);
      });
  };


  React.useEffect(() => {
    getResources();
  }, []);

     const deleteResource = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/resources/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            getResources();
        }, 1000);
      })
      .catch((err) => {
        console.error("get /resources error", err.message);
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
        Header: 'Slug',
        accessor: 'slug'
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
       
        return (<div className="flex justify-evenly"> <Link href={`/resource/view/${data.row.original.id}`}>
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
        onClick={() => deleteResource(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/resource/update/${data.row.original.id}`}>
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
      { NotificationManager.success('Deleted Resource successfully', 'Success')}
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
        <Link href={`/resource/addResource`}>
          <a>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add Resource
            </button>
          </a>
        </Link>
      </div>
    </div>
    <Datatable columns={columns} data={resources} />
    </Layout>
    )
}

export default withRedux(Resource)
