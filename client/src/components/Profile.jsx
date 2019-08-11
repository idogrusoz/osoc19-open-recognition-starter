import React, { Component } from "react";
import TrustButton from "./trust-components/TrustButton";
import TrustedLogo from "./trust-components/TrustedLogo";

class Profile extends Component {
  /*......render the trust relationship situation between the user loggedin and the profile user rendered
  if none is connected, show nothing
  if the user loggedin is viewing his profile, show nothing
  if the user loggedin is viewing another user's profile whith who he doesn't have a trust relaship,
  he will have the ability to send him a trust request
  if the user loggedin is viewing a profile of someone he is in relation with,
   he will see the trust stamp......*/
  renderTrustButton = id => {
    const trusted = this.props.trustRelation;
    const userConnected = localStorage.getItem("id");
    const profilerendered = id;
    if (userConnected !== null) {
      if (userConnected !== profilerendered) {
        if (trusted.length > 0) {
          if (trusted[0].active === true) {
            return <TrustedLogo id={profilerendered} />;
          } else if (
            trusted[0].active === false &&
            trusted[0].user2approval === false
          ) {
            return (
              <div className="trust-button">
                <button className="rect-button-no-hover trust-button">
                  Pending
                </button>
              </div>
            );
          }
        } else {
          return <TrustButton id={profilerendered} />;
        }
      } else {
        return null;
      }
    }
  };

  render() {
    //the infos of the profile rendered are passed as props from view component

    const user = this.props.name[0];
    return (
      <div className="profile" key={user.id}>
        <div className="image-container">
          {user.picture === null || user.picture === undefined ? (
            <img
              src={
                process.env.PUBLIC_URL +
                "/img/blank-profile-picture-973460_640.png"
              }
              alt="prof pic"
              className={"profile-image"}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + user.picture}
              alt="prof pic"
              className={"profile-image"}
            />
          )}
        </div>
        <div className="profile-text">
          <p>{`${user.first_name} ${user.last_name}`} </p>
          <p>{user.email} </p>
        </div>

        {parseInt(localStorage.getItem("id")) === user.id
          ? null
          : this.renderTrustButton(user.id)}
      </div>
    );
  }
}

export default Profile;
