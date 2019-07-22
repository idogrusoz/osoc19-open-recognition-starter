import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [{}]
    };
  }
  getnames = list => {
    let names = [];
    list.map(item => names.push(item.name));
    return names;
  };

  componentDidMount() {
    if (localStorage.getItem("id") && typeof this.props.loc === "undefined") {
      console.log("ici");
      fetch(`http://localhost:3000/skill/${localStorage.getItem("id")}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ skills: data });
        });
    } else {
      fetch(`http://localhost:3000/skill/${this.props.loc}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ skills: data });
        });
    }
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
            {this.state.skills.map((item, i) => (
              <tr key={i}>
                <td>
                  <button>+</button>
                </td>
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
