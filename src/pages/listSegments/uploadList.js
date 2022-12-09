import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";

const UploadList = () => {
  const [status, setStatus] = React.useState(undefined);
  const fileTypes = ["CSV"];
  const [file, setFile] = React.useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const uploadFile = async () => {
    let url = "http://20.193.136.151:5000/customers/upload"
    const token = sessionStorage.getItem("token");
    const data = {
      file: file
    }
    await ax
      .post(url, data, {
        headers: {
          'x-api-key': `${token}`
        }
      })
      .then((res) => {

      })
      .catch((err) => {

      });
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
      <div>Upload File</div>
      <div className='flex w-full' >
        <div className="w-2/4 p-1  border-2 mr-2" >
          <div className="text-center mt-50" style={{ marginTop: 250 }}>
            <FileUploader maxSize={50} handleChange={handleChange} name="file" types={fileTypes} />
            <p>Drag and drop your CSV here </p>
            <p>maxium file size 50mb</p>
            <input type="file" accept=".csv" onChange={(e) => { setFile(e.target.value) }} />
          </div>

        </div>
        <div>
        </div>
        <div className="w-2/4  h-3/5">
          <p className="font-semibold">Consent Guidelines</p>
          <p>Only subscribe lists of people who have explicitly opted in to receive marketing from you.</p>
          <p className="mt-5 font-semibold">This means no 3rd party lists, no prospects, no scraped lists from websites, no chambers of commerce lists, etc.</p>
          <p className="mt-5 mb-5">If you need help deciding,</p>
          <p className="font-semibold">How should my file be formatted?</p>
          <p >The first row of your file should contain headers for each column with at least one labeled customer_id (which must be unique - such as email/phone/internal customer id etc) if you’ve set up SMS messaging. You can also include other columns for First Name, Last Name, etc. if you'd like.</p>
          <p className="mt-5 mb-5">Phone Number should follow a supported format. Please include the country code (e.g., +17823746561) or a column with their address including country information for correct country code recognition, such as Country or Address.Country</p>
          <p className="mt-5 mb-5">If only some profiles being uploaded have explicitly consented to receive email marketing, add a column for Consent containing the word "Email" to subscribe those profiles. For SMS marketing, include the column SMS Consent Timestamp indicating the date and time the profile consented to receive SMS. A confirmation message will not be sent and any profiles that have unsubscribed will be resubscribed.</p>
        </div>
      </div>
      <button
        className="ml-3  btn btn-default btn-indigo create-btn w-full"
        type="button"
        onClick={() => { uploadFile() }}
      >
        Upload File
      </button>

    </Layout>
  )
}

export default withRedux(UploadList)
