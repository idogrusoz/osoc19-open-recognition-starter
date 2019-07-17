import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

class Skills extends Component {
  state = {
    skills: [{}]
  };
  getnames = list => {
    let names = [];
    list.map(item => {
      names.push(item.name);
    });
    return names;
  };

  componentDidMount() {
    fetch(`http://localhost:3000/skill/${localStorage.getItem("id")}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ skills: data });
      });
  }

  render() {
    return (
      <Card border="warning">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">skillname</th>
              <th scope="col">given</th>
              <th scope="col">Pro</th>
            </tr>
          </thead>
          <tbody>
            {this.state.skills.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    );
  }
}
export default Skills;
