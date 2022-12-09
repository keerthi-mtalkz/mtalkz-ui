import Link from "next/link";
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { shallowEqual, useSelector } from 'react-redux';
import { Badge } from '../../components/badges';
import ConfirmationModal from "../../components/confirmationmodal";
import Datatable from "../../components/datatable";
import SectionTitle from '../../components/section-title';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";

const ApiKey = () => {
  const [apiKeys, setApiKeys] = useState([])
  const [status, setStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = React.useState({ get: false, update: false, delete: false, view: false })
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const { userpermissions } = useSelector(
    state => ({
      userpermissions: state.userpermissions,
    }),
    shallowEqual
  )
  const getApiKeys = async () => {
    const token = sessionStorage.getItem('token');
    await ax
      .get("/api-keys", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.map((key) => {
          key.is_active = key.is_active == 1 ? "Active" : "Inactive"
        })
        setApiKeys(res.data);
      })
      .catch((err) => {
        console.error("get /apiKeys error", err);
      });
  };
  const getPermissions = async () => {
    let permissions = { get: false, update: false, delete: false, view: false, add: false }
    permissions["get"] = userpermissions.includes("apikeys.index") && getApiKeys()
    permissions["update"] = userpermissions.includes("apikeys.update")
    permissions["delete"] = userpermissions.includes("apikeys.destroy")
    permissions["view"] = userpermissions.includes("apikeys.show")
    permissions["add"] = userpermissions.includes("apikeys.store")
    setPermissions({ ...permissions })
  };

  const ConfirmationPopup = (id) => {
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const onCancel = () => {
    setStatus(undefined)
    setShowDeletePopup(false)
  }

  const onSubmit = () => {
    handleDelete()
  }

  const handleDelete = () => {
    const token = sessionStorage.getItem('token');

    ax.delete(`/api-keys/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setShowDeletePopup(false)

      setStatus({ type: "success" });
      setTimeout(() => {
        setStatus(undefined)

        getApiKeys();
      }, 1000);
    })

  }

  React.useEffect(() => {
    getPermissions()
  }, []);


  const columns = [
    {
      Header: 'Label',
      accessor: 'label'
    },
    {
      Header: 'Key',
      accessor: 'masked_key'
    },
    {
      Header: 'Status',
      sortable: false,
      Cell: (data) => {
        return (<div className="flex  ">
          <Badge size={'default'} color={data.row.original.is_active == 'Active' ? 'green' : 'red'} rounded>
            {data.row.original.is_active}
          </Badge>
        </div>)
      }
    },
    {
      Header: 'Resource',
      accessor: 'resource.name'
    },
    {
      Header: 'Total Credits',
      accessor: 'total_credits',
    },

    {
      Header: 'Active Credits',
      accessor: 'credits',
    },
    {
      Header: 'Actions',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {

        return (<div className="flex justify-evenly">

          {permissions.delete && <p
            style={{

              cursor: "pointer",
              lineHeight: "normal",
            }}
            onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
          </p>}

          {permissions.update && <Link href={`/apiKey/update/${data.row.original.id}`}>
            <p>
              <i className="icon-note text-1xl font-bold mb-2"></i>
            </p>
          </Link>}



        </div>
        )
      }

    }
  ]
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

      <SectionTitle title="API Keys" subtitle="" />

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
          {permissions.add && <Link href={`/apiKey/addApiKey`}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add Api Key
            </button>
          </Link>}

        </div>
      </div>
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted ApiKey successfully', 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}

          </div>
        </div>
      )}
      <Datatable columns={columns} data={apiKeys?.filter((val) => {
        if (searchQuery == "") {
          return val;
        } else if (
          (val.key.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            val.label.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            val?.resource?.name?.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            val.is_active.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          )
        ) {
          return val;
        }
      })
        .map((value, idx) => { return value })} />
    </Layout>
  )
}

export default withRedux(ApiKey)
