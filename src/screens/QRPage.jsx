import React,{useEffect, useState} from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client"
import axios from 'axios'
import success from '../asserts/success.png'
import uuid from 'react-uuid';

function QRPage() {

  const [id,setId]=useState(uuid())
  const [submited,setSubmited]=useState(false)

//   let socket = io("http://192.168.156.146:8000/");
//   socket.on('submited', msg => {
//     setSubmited(true)
// })

setInterval(async()=>{
  await axios({
      method: 'get',
      url: `http://192.168.156.146:8000/response/${id.toString()}`,
    }).then(res => {  
        console.log(res);
        setSubmited(res.data.submitted);

    }).catch((e)=>{
        console.log(e);
    })
},2000);




  return (

    <div className="vh-100 d-flex text-center justify-content-center align-items-center">
    {!submited ?
      <div>
        <h1 className="text-primary mb-6">Quiz Camp</h1>
        <h2 className="text-muted my-5">
          Visitors, scan the following qr code
        </h2>
        <QRCode value={`http://192.168.156.146:3000/questions/${id}`} size="150" />
      </div> :
      <div>
      <h2 className="text-muted my-5">
          Form submitted successfully
        </h2>
        <img src={success} alt="" height="80px" />
      </div>
    }
    </div>
  );
}

export default QRPage;
