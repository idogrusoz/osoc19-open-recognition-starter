import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export default class CommentNotificationItem extends Component {
    constructor(props){
        super(props)
        this.state={
            render: false,
            user: []
        }
    }

    componentDidMount = async() => {
        const id = this.props.item.author
        console.log(id);
        await fetch(`http://localhost:3000/users/${id}`)
            .then(response => response.json())
            .then(data => {
              console.log(data)
                this.setState({ 
                  user : data,
                  render: true
                 })
            })
            .catch(err => console.log('Error:', err))
    }

    handleReject = async (id) => {
        const user1 = this.props.item.author
        const user2 = this.props.item.reciever
        await fetch(`http://localhost:3000/comment/reject/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        })
            .then(res => console.log('Comment is deleted', res))
            await fetch(`http://localhost:3000/trust/reject/${user1}/${user2}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            })
              .then(res => {
                console.log("Trust relation is terminated", res);
              })
              .catch(err => console.log("Error:", err));
          };
        
    

    handleAccept = async (id) => {
        await fetch(`http://localhost:3000/comment/approve/${id}`, {
          method: "PUT"
        })
          .then(res => {
            console.log("Comment will be published", res);
          })
          .catch(err => console.log("Error:", err));
      };
    

    render(){
        return this.state.render ?(
            <Card>
            <Card.Body>
              <Card.Text>
                <strong>{this.state.user[0].first_name} {this.state.user[0].last_name} made a comment about you:</strong> <br/>
                {this.props.item.message}
              </Card.Text>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      this.handleAccept(this.props.item.id);
                      this.props.handleUpdate(this.props.item.id);
                    }}
                  >
                    Publish
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      this.handleReject(this.props.item.id);
                      this.props.handleUpdate(this.props.item.id);
                    }}
                  >
                    Reject
                  </Button>
                </Col>
              </Row>
              <p style={{color: "red"}}>Warning! <br/> Rejection of comment will terminate your trust relationship</p>
            </Card.Body>
          </Card>
        ) :
        (null)
}}