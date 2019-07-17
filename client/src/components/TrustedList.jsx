import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

export default class TrustedList extends Component {
  render() {
    return (
      <Card border="danger">
        <Card.Body>
          <Card.Title>Trusted List:</Card.Title>
          <Card.Text>
            <ul className="list-unstyled">
              <Media as="li">
                <img
                  width={55}
                  height={55}
                  className="mr-1"
                  src="https://picsum.photos/id/633/100/101"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>List-based media object</h5>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  </p>
                </Media.Body>
              </Media>
              <hr />
              <Media as="li">
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="https://picsum.photos/id/638/100/101"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>List-based media object</h5>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  </p>
                </Media.Body>
              </Media>
              <hr />
              <Media as="li">
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="https://picsum.photos/id/623/100/101"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>List-based media object</h5>
                  <p>Donec lacinia congue felis in faucibus.</p>
                </Media.Body>
              </Media>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
