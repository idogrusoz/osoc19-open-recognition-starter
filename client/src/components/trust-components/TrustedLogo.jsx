import React from "react"
import or from "./or.svg"

function TrustedLogo(props) {

 const handleCancel = async () => {
   console.log('in cancel');
    const id = localStorage.getItem("id");
    const data = {
      user1: parseInt(`${props.id}`),
      user2: parseInt(id)
    };
    await fetch(`http://localhost:3000/trust/reject/${id}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {console.log('good');
      })
      .catch(err => console.log("Error:", err));
  };
    return (
      <div>
        <img src={or} alt="open-recognition" width="70px" height="70px" />
        <br />
        <button
          variant="danger"
          width="20px"
          style={{ backgroundColor: "#ee6e73", color: "white" }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    );
}

export default TrustedLogo