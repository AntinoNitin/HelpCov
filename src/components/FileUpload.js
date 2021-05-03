import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {uploadFile} from '../Apis/api'
function FileUpload(props) {
  const [successSubmit, setSuccesssSubmit] = useState(false)
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({    
    maxFiles:100
  });

  const acceptedFileItems = acceptedFiles.map((file, index )=> {
    
    acceptedFiles[index].userId= props.userId
    acceptedFiles[index].profileId= props.profileId
    return (
    <li key={file.path} style={{fontSize:"1.6rem"}}>
      {file.path}
    </li>
    )
    });

//   const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
//    return (
//      <li key={file.path}>
//           {file.path} - {file.size} bytes
//           <ul>
//             {errors.map(e => <li key={e.code}>{e.message}</li>)}
//          </ul>

//      </li>
//    ) 
//   });
  const handleSubmit = async () => {
      if(acceptedFiles.length > 0) {
        const res = await uploadFile(acceptedFiles)
        if(res.status === "success") {
          acceptedFiles.length = 0
          setSuccesssSubmit(true)
        }
      }
  }

  return (
      <>
        <div className="w-100 center-content" style={{marginTop:'1rem'}}>
            {!successSubmit ? 
            <>
              <section className="dropzone_container container">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                  <h1>Drag 'n' drop some files here, or click to select files</h1>
                </div>
              </section>
              <aside>
                <h2 style={{fontSize:'2rem'}}>Uploaded files</h2>
                <ul className="file_list">{acceptedFileItems}</ul>
              </aside>
              {acceptedFileItems.length > 0 && <div style={{marginTop:'1rem', width:'15%'}}>
                  <button 
                      className="help-button w-100"
                      onClick={handleSubmit}
                  >
                  Submit
                  </button>
              </div>
              }
            </> 
            :
            <div>
              <h1>Resources added, Successfully!</h1>
              <div style={{marginTop:'1rem'}}>
                <button 
                  className="help-button w-100"
                  onClick={()=> setSuccesssSubmit(false)}
                >
                Add more files
                </button>
              </div>
              <div style={{marginTop:'1rem'}}>
                <button 
                  className="help-button w-100"
                  onClick={()=>props.handleRest()}
                >
                  Exit
                </button>
              </div>
            </div>
          }
        </div>
    </>
  );
}

export default FileUpload