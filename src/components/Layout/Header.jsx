import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { UserCard } from "../../components/Card";
import SearchInput from "../../components/SearchInput";
import AvsLogo from "../../assets/abs.png";
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
} from "react-icons/md";
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from "reactstrap";
import bn from "../../utils/bemnames";
import { MainContext } from "context/Main";
// import { getBreakpoint } from "context/Main/States/Responsiveness";

const bem = bn.create("header");

const SearchField = () => {
  const [searchValues, setSearchValues] = useState({});
  return (
    <SearchInput
      onChange={({ currentTarget: { value } }) =>
        setSearchValues({
          ...searchValues,
          name: value,
        })
      }
    />
  );
};

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isOpenUserCardPopover: false,
  };

  static contextType = MainContext;

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  render() {
    // const { rootState } = this.context;
    // console.log("updatedState", getBreakpoint(rootState));

    return (
      <Navbar light expand className={bem.b("bg-white mb-0")}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        {/* {getBreakpoint(rootState).isMobile && ( */}
        <Nav navbar>
          <SearchField />
        </Nav>
        {/* // )} */}
        <Nav navbar className={bem.e("nav-right")}>
          {/* <NavItem className="d-inline-flex ml-2 mr-2 mt-2">
            <NavLink id="Popover1" className="position-relative">
              <MdNotificationsNone
                size={25}
                className="text-secondary can-click"
                onClick={this.toggleNotificationPopover}
              />
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody></PopoverBody>
            </Popover>
          </NavItem> */}

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
                circle
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 ">
                {/* <NavItem>
                  <img
                    className={bem.e("nav-right ml-3 mr-3 ")}
                    style={{ width: "80px" }}
                    src={AvsLogo}
                    alt=""
                  />
                </NavItem> */}
                <UserCard
                  title="Hermela Kidus"
                  subtitle="Hermela@gmail.com"
                  text="Project Manager"
                  logo={AvsLogo}
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdInsertChart /> Stats
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdMessage /> Messages
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Settings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Help
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
