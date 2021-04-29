import React from 'react';
import {useDropzone} from 'react-dropzone';

function FileUpload() {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({    
    maxFiles:100
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path} style={{fontSize:"1.6rem"}}>
      {file.path}
    </li>
  ));

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
  const handleSubmit = () => {
      console.log(acceptedFileItems)
  }

  return (
      <>
        <div className="w-100 center-content">
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
        </div>
    </>
  );
}

export default FileUpload