import React from "react";
import { Card, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

function TrustRequestItem(props) {
  const handleAccept = () => {
    const dateApproving = new Date();
    const id = localStorage.getItem("id");
    const data = {
      userrequesting: `${props.item.id}`,
      userrecieving: parseInt(id),
      dateapproving: dateApproving
    };
    console.log(data);
    fetch(`http://localhost:3000/trust/approve/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => console.log("Trust request is approved", res))
      .catch(err => console.log("Error:", err));
  };

  const handleReject = async () => {
    const id = localStorage.getItem("id");
    const data = {
      userrequesting: `${props.item.id}`,
      userrecieving: parseInt(id)
    };
    await fetch(`http://localhost:3000/trust/reject/${id}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        console.log("Trust request is rejected", res);
      })
      .catch(err => console.log("Error:", err));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          {props.item.first_name} {props.item.last_name} trusts you
        </Card.Text>
        <Row>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                handleAccept();
                props.handleUpdate(props.item.id);
              }}
            >
              Accept
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                handleReject();
                props.handleUpdate(props.item.id);
              }}
            >
              Reject
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrustRequestItem;
