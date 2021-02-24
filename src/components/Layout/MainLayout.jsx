import { Content, Header, Sidebar } from "../../components/Layout";
import React from "react";
import {
  getState,
  updateResponsiveness,
  // getBreakpoint,
} from "context/Main/States/Responsiveness";
import { MainContext } from "context/Main";

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector(".cr-sidebar")
      .classList.contains("cr-sidebar--open");
  }

  UNSAFE_componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  static contextType = MainContext;

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  // close sidebar when
  handleContentClick = (event) => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === "xs" ||
        this.props.breakpoint === "sm" ||
        this.props.breakpoint === "md")
    ) {
      this.openSidebar("close");
    }
  };

  checkBreakpoint(breakpoint) {
    const { dispatch } = this.context;
    switch (breakpoint) {
      case "xs":
        updateResponsiveness({}, dispatch, "isMobile", true);
        updateResponsiveness({}, dispatch, "isTab", false);
        updateResponsiveness({}, dispatch, "isDesktop", false);
        this.openSidebar("close");

        break;

      case "sm":
        updateResponsiveness({}, dispatch, "isMobile", false);
        updateResponsiveness({}, dispatch, "isTab", true);
        updateResponsiveness({}, dispatch, "isDesktop", false);
        this.openSidebar("close");

        break;
      case "md":
        updateResponsiveness({}, dispatch, "isMobile", false);
        updateResponsiveness({}, dispatch, "isTab", false);
        updateResponsiveness({}, dispatch, "isDesktop", true);
        this.openSidebar("open");

        break;

      case "lg":
      case "xl":
        updateResponsiveness({}, dispatch, "isMobile", false);
        updateResponsiveness({}, dispatch, "isTab", false);
        updateResponsiveness({}, dispatch, "isDesktop", true);
        this.openSidebar("open");

        break;
      default:
        return this.openSidebar("open");
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  updateState = () => {
    const { rootState, dispatch } = this.context;
    updateResponsiveness(
      {},
      dispatch,
      "isMobile",
      getState(rootState) ? !getState(rootState).isMobile : true
    );
  };

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          {children}
          {/* <Footer /> */}
        </Content>
      </main>
    );
  }
}

export default MainLayout;
