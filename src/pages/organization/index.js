import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";




const Organization=()=>{
 const [organizations,setOrganizations]=useState([])

 const deleteOrganization = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/organizations/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setTimeout(() => {
          getOrganizations();
        }, 1000);
      })
      .catch((err) => {
        console.error("get /organizations error", err.message);
      });
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};

  const getOrganizations = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/organizations", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setOrganizations(res.data);
      })
      .catch((err) => {
        console.error("get /organizations error", err);
      });
  };


  React.useEffect(() => {
    getOrganizations();
  }, []);


  const columns =  [
    {
      Header: 'ID',
      accessor: 'id'
    },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone No',
        accessor: 'phone'
      },
      {
        Header: 'Address',
        accessor: 'address',
       
      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> <Link href={`/organization/view/${data.row.original.id}`}>
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
        onClick={() => deleteOrganization(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/organization/update/${data.row.original.id}`}>
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
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
    <Datatable columns={columns} data={organizations} />
    </Layout>
    )
}

export default withRedux(Organization)
