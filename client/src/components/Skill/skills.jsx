import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [{}],
      pros: []
    };
  }
  getnames = list => {
    let names = [];
    list.map(item => names.push(item.name));
    return names;
  };

  givetrust = trust => {
    const data = {
      name: trust,
      author: localStorage.getItem("id"),
      reciever: this.props.loc
    };

    fetch(`http://localhost:3000/skill/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("A new user added"))
      .catch(error => console.log("Error:", error));

    console.log(
      `${localStorage.getItem("id")} trust ${
        this.props.loc
      } on the ${trust} skill`
    );
  };

  componentDidMount() {
    if (localStorage.getItem("id") && typeof this.props.loc === "undefined") {
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
          data.map(item =>
            fetch(
              `http://localhost:3000/skill/pros/${localStorage.getItem("id")}/${
                item.name
              }`
            )
              .then(response => response.json())
              .then(data => {
                let pro = this.state.pros;
                pro.push(data[0].count);
                this.setState({
                  pros: pro
                });
              })
          );
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
              <th scope="col">give</th>
            </tr>
          </thead>
          <tbody>
            {this.state.skills.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{this.state.pros[i]}</td>
                <td>
                  <button onClick={() => this.givetrust(item.name)}>
                    I trust you
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    );
  }
}
export default Skills;
