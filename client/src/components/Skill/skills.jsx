import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddSkill from "./AddSkill";

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
    localStorage.getItem("id") &&
    localStorage.getItem("id") !== this.props.loc &&
    this.props.trustRelation.length > 0
      ? true
      : false;

  givetrust = trust => {
    document.getElementById(trust).disabled = "disabled";
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

  renderButton = item => {
    let skillsList = [];
    fetch(`http://localhost:3000/skill/preventmultiple/${this.props.loc}`)
      .then(response => response.json())
      .then(data => (skillsList = data))
      .then(() => {
        skillsList.forEach(skill => {
          if (
            trusted.length > 0 &&
            skill.name === item.name &&
            skill.author === parseInt(localStorage.getItem("id"))
          ) {
            document.getElementById(item.name).disabled = "disabled";
          }
        });
      });
    const trusted = this.props.trustRelation;
    if (trusted.length < 1) {
      return null;
    } else {
      if (trusted[0].active) {
        return (
          <Button
            id={item.name}
            variant="info"
            type="button"
            className="btn btn-success"
            onClick={() => this.givetrust(item.name)}
          >
            +
          </Button>
        );
      } else {
        return null;
      }
    }
  };

  render() {
    return (
      <Card
        style={{
          border: "solid 1px #d4bad8",
          WebkitBoxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)",
          MozBoxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)",
          boxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)"
        }}
      >
        <h2>Skills</h2>
        <Table striped bordered hover style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Votes</th>
              <th scope="col">By Pro</th>
              {this.verifications() ? <th scope="col">Reco</th> : null}
            </tr>
          </thead>
          <tbody>
            {this.state.skills.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{this.state.pros[i]}</td>
                {this.verifications() ? (
                  <td>{this.renderButton(item)}</td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
        <AddSkill trust={this.props.trustRelation} user={this.props.loc} />
      </Card>
    );
  }
}
export default Skills;
