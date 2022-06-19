import React, {useState} from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  width: "60%",
  maxWidth: "80%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};
const descriptionStyle = {
  textAlign: "center",
  margin: "5px auto",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const descriptionStyle2 = {
  margin: "10px auto 0 auto",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Edit({ open, children, onClose }) {
  const [formData, updateFormData] = useState('');
    if (!open) return null;
  


  //UPDATING Record
  async function updateRecord() {
    var token = localStorage.getItem("USER_TOKEN");
    var record = localStorage.getItem("SELECTION");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var description = formData;
    console.log(description); //Test line
    var raw = JSON.stringify({
      description: description,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "manual",
    };
    fetch(`${process.env.REACT_APP_API_URL}/records/${record}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        window.location.assign(`${process.env.REACT_APP_CLIENT_URL}/collections`);
      });
  }
  
const description = localStorage.getItem("Description");
const img = localStorage.getItem("Img");
  return ReactDom.createPortal(
    <>
    
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}> 
      <embed style={descriptionStyle} src={`${process.env.REACT_APP_API_URL}/public/uploads/images/${img}`} width="90%" height="90%" />
        <label style={descriptionStyle} htmlFor="description">
          {" "}
          Edit Description: </label>
          <strong style={descriptionStyle} id="description">
            {description}
          </strong>
       
        <input style={descriptionStyle} 
          type="text"
          id="newDescription"
          placeholder="new description"
          name="description"
         
          onChange={(e) =>updateFormData(e.target.value)}
          required
        />
        <button style={descriptionStyle} onClick={updateRecord}>Update</button>
        <button style={descriptionStyle2} 
            
         onClick={onClose}>Close Modal</button>
        
      </div>
    </>,
    document.getElementById("portal")
  );
}