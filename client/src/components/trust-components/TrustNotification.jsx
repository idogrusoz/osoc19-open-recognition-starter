// import React, { Component } from "react";
// import TrustRequestItem from "./TrustRequestItem";

// export default class TrustNotification extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: localStorage.getItem("id"),
//       users: this.props.users,
//       profile: [{}]
//     };
//   }

//   getTrustPending = async () => {
//     let newUsers = [];
//     await fetch(`http://localhost:3000/trust/pending/${this.state.id}`)
//       .then(res => res.json())
//       .then(data => {
//         newUsers = [];
//         data.map(
//           async item =>
//             await fetch(`http://localhost:3000/users/${item.userrequesting}`)
//               .then(res => res.json())
//               .then(data => {
//                 newUsers.push(data[0]);
//                 this.setState({ users: newUsers });
//               })
//         );
//       });
//   };

//   async componentDidMount() {
//     this.getTrustPending();
//   }

//   handleUpdate = id => {
//     const users = this.state.users;
//     const newUsers = users.filter(user => user.id !== id);
//     this.setState({ users: newUsers });
//   };
//   render() {
//     return typeof this.props.users[0].first_name !== "undefined"
//       ? this.state.users.map((user, i) => (
//           <TrustRequestItem
//             key={i}
//             item={user}
//             handleUpdate={this.handleUpdate}
//             handleAccept={this.props.handleAccept}
//           />
//         ))
//       : null;
//   }
// }
