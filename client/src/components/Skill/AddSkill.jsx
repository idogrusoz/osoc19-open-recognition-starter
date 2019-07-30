import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import React from "react";

function AddSkill(props) {
  const [lgShow, setLgShow] = useState(false);

  const addSkill = () => {
    const skill = document.getElementById("skill").value;
    const author = localStorage.getItem("id");
    const reciever = props.user;

    const data = {
      author: author,
      reciever: reciever,
      name: skill
    };



    fetch(`http://localhost:3000/skill`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("new skill added"))
      .catch(error => console.log("Error:", error));
    setLgShow(false);
  };

  const renderButton = () => {
    const trusted = props.trust;
    if (trusted.length < 1) {
      return null;
    } else {
      if (trusted[0].active) {
        return (
          <div className="add-button">
            <button
              className="rect-button-on-white"
              onClick={() => setLgShow(true)}
            >
              Add skill
            </button>
          </div>
        );
      } else {
        return null;
      }
    }
  };
   
  // const handleChange = event => {
  //   console.log(document.getElementById('submitButton').getAttribute('disabled'));
    
  //   if(event.target.value.length > 3) {
  //     document.getElementById("submitButton").setAttribute('disabled', false)
  //   }
  // }

  return (
    <div>
      {props.user !==
      parseInt(
        localStorage.getItem("id") && localStorage.getItem("id") !== undefined
      )
        ? renderButton()
        : null}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div className="pop-up-header">
          <h3>Please add a skill that you recognize</h3>
        </div>

        <form className="add-form">
          <p className={"form-name"}>Skill:</p>
          <input
            type="text"
            rows="1"
            id="skill"
            placeholder="e.g. Team player. / Honest reseller etc."
            // onChange= {handleChange}
          />
        </form>

        <button id="submitButton" className="rect-button-on-white" onClick={addSkill} /*disabled = 'true'*/ >
          Submit
        </button>
      </Modal>
    </div>
  );
}

export default AddSkill;
