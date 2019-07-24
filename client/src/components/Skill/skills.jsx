import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import AddSkill from "./AddSkill"

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

  verifications = () =>
    localStorage.getItem("id") && localStorage.getItem("id") !== this.props.loc
      ? true
      : false;

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
          let user;
          if (localStorage.getItem("id")) {
            user = localStorage.getItem("id");
          } else {
            user = this.props.loc;
          }
          data.map(item =>
            fetch(`http://localhost:3000/skill/pros/${user}/${item.name}`)
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

  renderButton = (item) => {
    const trusted = this.props.trustRelation
    if(trusted.length < 1) {
      return null
    } else {
      if(trusted[0].active) {
        return <button
        style={{ width: "100%" }}
        type="button"
        className="btn btn-success"
        onClick={() => this.givetrust(item.name)}
      >
        I trust you
      </button>
      } else {
        return null
      }
    }
  }

  render() {
    return (
      <Card style={{ border: "solid 1px #d4bad8" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">skillname</th>
              <th scope="col">given</th>
              <th scope="col">Pro</th>
              {this.verifications() ? (
                <th scope="col" style={{ width: "50%" }}>
                  give
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {this.state.skills.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{this.state.pros[i]}</td>
                {this.verifications() ? (
                  <td>
                    {this.renderButton(item)}
                    
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
        <AddSkill 
        trust={this.props.trustRelation}
        user={this.props.loc}
        />
      </Card>
    );
  }
}
export default Skills;
