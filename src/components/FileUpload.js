import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {uploadFile} from '../Apis/api'
import * as XLSX from 'xlsx';
function FileUpload(props) {
  const [successSubmit, setSuccesssSubmit] = useState(false)
  const [submitArray, setsubmitArray] = useState([])
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({    
    maxFiles:100
  });

  const acceptedFileItems = acceptedFiles.map((file)=> {
    return (
    <li key={file.path} style={{fontSize:"1.6rem"}}>
      {file.path}
    </li>
    )
    });

    useEffect(()=>{
      if(submitArray.length > 0) {        
        (async () =>{
          const res = await uploadFile(submitArray)
          if(res.status === "success") {
            acceptedFiles.length = 0
            setSuccesssSubmit(true)
          }
        })()
      }
    }, [submitArray])
  const handleSubmit = async () => {
    if(acceptedFiles.length > 0) {
      const csvArray = []
      for(let i = 0; i < acceptedFiles.length; i++){
       
        var reader = new FileReader()           
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });

          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          const splitData = data.split(/\r\n|\n/)
          
          for( let index = 0; index < splitData.length; index++) {
            if( index !==0 && splitData[index]) {
              const splitedVal = splitData[index].split(',')
              let temp ={
                contactPerson: splitedVal[0],
                contactNumber: splitedVal[1],
                address: splitedVal[2],
                registrationId: splitedVal[3],
                stateName: splitedVal[4],
                cityName: splitedVal[5],
                pinCode: splitedVal[6],
                userType: splitedVal[7],
                products: splitedVal[8],
                units: splitedVal[9],
                userId: props.userId,
                profileId: props.profileId
              }
              csvArray.push(temp)
            }
            if(i === acceptedFiles.length-1 && index === splitData.length-1 ) {
              setsubmitArray(csvArray)
            }                      
          }     
        }            
       reader.readAsBinaryString(acceptedFiles[i]); // convert to base64 string       
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