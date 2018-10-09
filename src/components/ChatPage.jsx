import React from 'react';
import {
  Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, ListGroup, ListGroupItem, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Media, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faCommentAlt, faPowerOff, faUser, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../less/ChatPage.less';

import terryImg from '../img/terry.jpg';
import emmaImg from '../img/emma.jpg';

export default class ChatPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accountDropdownOpen: false
    };
  }

  toggleAccountDropdown = () => {
    this.setState(prevState => ({
      ...prevState,
      accountDropdownOpen: !prevState.accountDropdownOpen
    }));
  };

  render() {
    const { accountDropdownOpen } = this.state;
    return (
      <div>

        <Navbar color="dark" className="text-light">
          <Container>

            <NavbarBrand>
              <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
              <span> Slek</span>
            </NavbarBrand>

            <Nav right navbar>
              <NavItem>
                <Dropdown className="account-dropdown" isOpen={accountDropdownOpen} toggle={this.toggleAccountDropdown}>

                  <DropdownToggle tag="div">
                    <div className="avatar">
                      <img src={terryImg} alt="avatar" />
                    </div>
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem header>Terry Crews</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <FontAwesomeIcon icon={faUser}/>
                      <span> Edit profile</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <FontAwesomeIcon icon={faPowerOff}/>
                      <span> Logout</span>
                    </DropdownItem>
                  </DropdownMenu>

                </Dropdown>
              </NavItem>
            </Nav>

          </Container>
        </Navbar>

        <Container>
          <Row>

            <Col sm={12} md={4} lg={3}>

              <div className="channels text-light">

                <ListGroup flush>
                  <ListGroupItem className="header">
                    <FontAwesomeIcon icon={faUserFriends}/>
                    <span> Channels</span>
                  </ListGroupItem>

                  <ListGroupItem>
                    <span>Developers </span>
                    <Badge pill>2</Badge>
                  </ListGroupItem>
                  <ListGroupItem>
                    <span>Sales & Marketing </span>
                  </ListGroupItem>
                  <ListGroupItem>
                    <span>User Support </span>
                    <Badge pill>11</Badge>
                  </ListGroupItem>
                  <ListGroupItem>
                    <FontAwesomeIcon icon={faPlus}/>
                    <span> Add</span>
                  </ListGroupItem>

                </ListGroup>

              </div>
            </Col>

            <Col sm={12} md={8} lg={9}>

              <Media list className="messages">
                <Media tag="li">
                  <Media object className="avatar align-self-end" src={emmaImg} alt="Generic placeholder image" />
                  <Media body>
                    <p>
                      <div>
                        Co to?
                      </div>
                    </p>
                    <p>
                      <div>
                        Peru pámbu prak kulka. Nenašel s koukám věci proužkovaná nadobro o nebo jí ta brna prostředků, dva barvy herci dovolujete.
                      </div>
                    </p>
                    <p>
                      <div>
                        Dluhy zlé nemůžeš v aretýrovat.
                      </div>
                    </p>
                  </Media>
                </Media>
                <Media tag="li" className="text-right">
                  <Media body>
                    <p>
                      <div>
                        Hrá kalousů, má mohl mertl mládenče: po prkny nevěříte ó rozřeší triumfoval u od jmen bibli sítě mezek pouhých berlínského uzlíky dědit komtesou ta oddělení hocha. Nohavic země ví domácká uvidí. Veď šoupání ze vyšvihl 11 po slušné celá.
                      </div>
                    </p>
                    <p>
                      <div>
                        Jej krásných pánubohu řečeno z chodníky pitr škytavě snižuje?
                      </div>
                    </p>
                  </Media>
                </Media>
                <Media tag="li">
                  <Media object className="avatar align-self-end" src={emmaImg} alt="Generic placeholder image" />
                  <Media body>
                    <p>
                      <div>
                        To auto no cíp myš divadla.
                      </div>
                    </p>
                    <p>
                      <div>
                        U svůj ba aparát oč částečně oběšenec
                      </div>
                    </p>
                  </Media>
                </Media>
              </Media>

            </Col>

          </Row>
        </Container>

      </div>
    );
  }
}
