import React, { Component } from "react";
import Header from "../header/Header";
class SearchResult extends Component {
  state = {
    users: [{}]
  };

  render() {
    return (
      <div className="sskillcontainer">
        <Header />
        <div className="card">
          <div className="card-header">search result</div>
        </div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(item => (
              <tr>
                <td>{item.first_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default SearchResult;
