import React from "react";
import { Card, Button } from 'react-bootstrap'
import { Col, Row } from 'react-bootstrap'


function TrustRequestItem(props) {
    
    const handleAccept = () => {
        const dateApproving = new Date()
        const id = localStorage.getItem('id')
        const data = {
            userrequesting: `${props.item.userrequesting}`,
            userrecieving: id,
            dateapproving: dateApproving
        }
        console.log(data)
        fetch(`http://localhost:3000/trust/approve/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => console.log("Trust request is approved", res))
        .catch(err => console.log("Error:", err))
    }


      return (
          <Card>
        <Card.Body>{console.log(props.item)}
          <Card.Text>{props.item.first_name} {props.item.last_name} trusts you</Card.Text>
         <Row>
            <Col>
          <Button variant="primary" size="sm" onClick={handleAccept}>Accept</Button>
          </Col>
          <Col>
          <Button variant="primary"size="sm">Reject</Button>
          </Col>
          </Row>
        </Card.Body>
        </Card>
      );
    
}

export default TrustRequestItem 