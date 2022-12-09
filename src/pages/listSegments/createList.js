import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications';
import { WithContext as ReactTags } from 'react-tag-input';
import Breadcrumb from '../../components/breadcrumbs';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';

const CreateList = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const [errors, setErrors] = React.useState(undefined)
  const [status, setStatus] = React.useState(undefined);
  const [tags, setTags] = React.useState([]);
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  const items2 = [
    { title: 'List & Segments', url: '/listSegments', last: false },
    { title: 'Create', url: '/listSegments/createListSegment', last: true },
  ]

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = tag => {
    setTags([...tags, tag]);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const validateFields = () => {
    if (tags.length === 0) {
      setErrors({ tags: ['tags are required'] })
      return false
    }
    else return true
  }
  const onSubmit = (data) => {
    setErrors(undefined)

    const isValid = validateFields()
    if (typeof window !== "undefined" && isValid) {
      data.tags = tags.map((tag) => {
        return tag.id
      })
      data.customer_ids = [];
      const token = sessionStorage.getItem('token');
      fetch("http://20.193.136.151:5000/lists/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'x-api-key': `${token}`,
          'Content-type': 'application/json',
          'Accept': 'application/json',
        }
      })
        .then((res) => {
          setStatus({ type: "success" });
          setStatus(undefined);
          setTimeout(() => {
            router.push("/listSegments/uploadList");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setErrors(err.response.data.errors)
          } else {
            setStatus({ type: "error", message: err.response.data.message });
            setStatus(undefined);
          }
        });
    }

  }
  return (
    <Layout className="overflow-x-scroll">
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('List added successfully', 'Success')}
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
      <div className='flex text-center mb-6'>
        <div >
          <Breadcrumb items={items2} />
        </div>
        <div style={{ marginTop: "-5px" }} className='font-bold mb-1 p-1 text-lg'>List</div>
      </div>
      <p >Give your list a name and then we'll add people to it</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4  mt-10"
      >
        <div className='flex'>
          {/*input*/}
          <div className="w-2/4 mr-2 mb-4">
            <label className="block">
              <span className="text-default">Name</span>
              <span className="text-red-600" >*</span>
              <input
                name="name"
                type="text"
                className="form-input mt-1 border-2 border-slate-900 text-xs block w-full bg-white"
                placeholder="Enter List name"
                required
                ref={register()}
                maxLength={255}
              />
            </label>
            {errors && errors.name && (
              errors.name.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })

            )}
          </div>
          <div className='w-2/4'  >
            <span className="text-default">Tags</span>
            <span className="text-red-600" >*</span>
            <ReactTags
              inputFieldPosition="top"
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              autocomplete
              classNames={{ tag: "badge badge-default badge-indigo ml-1 mt-1 rounded-lg", tagInputField: "form-input mt-1 text-xs block w-full bg-white" }}

            />
            {errors && errors.tags && (
              errors.tags.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })

            )}
          </div>

        </div>
        <div style={{ width: "500px" }} className=" mb-4">
          <label className="block">
            <span className="text-default">Description</span>
            <textarea
              ref={register()}
              name="description"
              className="form-input mt-1 border-2 border-slate-900 text-xs block w-full bg-white"
              rows="3" cols="70">  </textarea>
          </label>
          {errors && errors.name && (
            errors.name.map((err) => {
              return <p className="mt-1 text-xs text-red-500">{err}</p>
            })

          )}
        </div>



        <div className=" w-2/4 flex" style={{ marginTop: "10px" }}>
          <input
            type="cancel"
            className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
            value="Cancel"
            onClick={() => {
              router.push("/listSegments/createListSegment");
            }}
          />
          <input
            type="submit"
            className="btn cursor-pointer btn-default btn-block btn-indigo mt-5 "
            value="Create List"
          />
        </div>
      </form>
    </Layout>
  )
}

export default withRedux(CreateList)
