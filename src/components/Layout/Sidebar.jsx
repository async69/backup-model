import sidebarBgImage from "../../assets/img/sidebar/sidebar-4.jpg";
import SourceLink from "../../components/SourceLink";
import React from "react";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdAttachMoney,
  MdBook,
  MdPerson,
  MdMap,
  MdSettings,
  MdHome,
  MdDomain,
  MdAssignmentTurnedIn,
  MdAddShoppingCart,
  MdNoteAdd,
  MdStore,
  MdViewList,
  MdPersonAdd,
  MdAdd,
  MdViewQuilt,
  MdReceipt,
  MdPeople,
  MdComputer,
} from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from "reactstrap";
import bn from "../../utils/bemnames";
import routes from "config/routes/index";
import LogoWhite from "../../assets/Logo-White.png";

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundColor: "#999999",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

// ================= FINANCE ROUTES =================

const financeCondensed = [
  {
    to: routes.financeDashboard,
    name: "Dashboard",
    exact: true,
    Icon: MdDashboard,
  },

  {
    to: routes.financeMasterData,
    name: "Master Data",
    exact: false,
    Icon: MdDomain,
  },
  {
    to: routes.financeSalesProces,
    name: "Accounts Receivable  ",
    exact: false,
    Icon: MdAssignmentTurnedIn,
  },
  {
    to: routes.financePurchaseProcess,
    name: "Account Payable",
    exact: false,
    Icon: MdAddShoppingCart,
  },
  {
    to: routes.financeJournals,
    name: "Journals",
    exact: false,
    Icon: MdBook,
  },
  {
    to: routes.financeLedgerEntries,
    name: "Ledger Entries",
    exact: false,
    Icon: MdNoteAdd,
  },
  // {
  //   to: routes.financeCashManagement,
  //   name: "Cash Management ",
  //   exact: false,
  //   Icon: MdAttachMoney,
  // },
  {
    to: routes.financeInventory,
    name: "Inventory",
    exact: false,
    Icon: MdStore,
  },
  // {
  //   to: routes.financeFixedAssetManagement,
  //   name: "Fixed Asset Management",
  //   exact: false,
  //   Icon: MdHome,
  // },
  {
    to: routes.financeReports,
    name: "Reports",
    exact: false,
    Icon: MdViewList,
  },
  {
    to: routes.financeSetup,
    name: "Setup",
    exact: false,
    Icon: MdSettings,
  },
];

// ================= INVENTORY ROUTES =================
const warehouseCondensed = [
  {
    to: routes.warehouseDashboard,
    name: "Dashboard",
    exact: false,
    Icon: MdDashboard,
  },
  {
    to: routes.warehouseMasterdata,
    name: "Master Data",
    exact: false,
    Icon: MdDomain,
  },
  {
    to: routes.warehouseCommon,
    name: "Common",
    exact: false,
    Icon: MdMap,
  },
  {
    to: routes.warehouseInventoryControl,
    name: "Inventory Control",
    exact: false,
    Icon: MdStore,
  },
  {
    to: routes.warehouseSetup,
    name: "Setup",
    exact: false,
    Icon: MdSettings,
  },
];

// ================= PURCHASE ROUTES =================

const purchaseCondensed = [
  {
    to: routes.purchaseDashboard,
    name: "Dashboard",
    exact: false,
    Icon: MdDashboard,
  },
  {
    to: routes.purchaseMasterData,
    name: "Master Data",
    exact: false,
    Icon: MdDomain,
  },
  {
    to: routes.purchaseCommon,
    name: "Common",
    exact: false,
    Icon: MdMap,
  },
  {
    to: routes.purchaseSetup,
    name: "Setup",
    exact: false,
    Icon: MdSettings,
  },
];

// ================= SALES ROUTES =================

const salesCondensed = [
  {
    to: routes.salesDashboard,
    name: "Dashboard",
    exact: false,
    Icon: MdDashboard,
  },
  {
    to: routes.salesCustomers,
    name: "Customers",
    exact: false,
    Icon: MdPersonAdd,
  },
  {
    to: routes.salesOrder,
    name: "Sales Order",
    exact: false,
    Icon: MdMap,
  },
  {
    to: routes.salesSetup,
    name: "Setup",
    exact: false,
    Icon: MdSettings,
  },
];

const hrCondensed = [
  {
    to: routes.humanrescourcesDashboard,
    name: "Dashboard",
    exact: true,
    Icon: MdDashboard,
  },
  {
    to: routes.employees,
    name: "Employees",
    exact: false,
    Icon: MdViewQuilt,
  },
  {
    to: routes.appilicants,
    name: "New Applicants ",
    exact: false,
    Icon: MdAdd,
  },
  {
    to: routes.payrollManagement,
    name: "Payroll ",
    exact: false,
    Icon: MdAttachMoney,
  },
  {
    to: routes.reports_hr,
    name: "Reports ",
    exact: false,
    Icon: MdReceipt,
  },
  {
    to: routes.payrollProcess,
    name: "Payroll Process",
    exact: false,
    Icon: FaMoneyCheckAlt,
  },
  {
    to: routes.setupHR,
    name: "Setup",
    exact: false,
    Icon: MdSettings,
  },
];

const itcondensed = [
  {
    to: routes.it,
    name: "All Employees",
    exact: true,
    Icon: MdComputer,
  },
];

// ================= GENERAL ROUTES =================
const navItems = [
  // { to: routes.homePage, name: "Finance", exact: true, Icon: MdDashboard },
];

const bem = bn.create("sidebar");

class Sidebar extends React.Component {
  state = {
    // ======FINANCE STATES
    isOpenFinanceCondensed: false,
    isOpenWarehouseCondensed: false,
    isOpenSalesCondensed: false,
    isOpenFinance: false,
    isOpenPurchaseCondensed: false,
    isOpenHrCondensed: false,
    isOpenItCondensed: false,
  };

  handleClick = (name) => () => {
    this.setState((prevState) => {
      const isOpen = prevState[`isOpen${name}`];

      let options = {};
      for (var item in prevState) {
        if (!isOpen) {
          options[item] = false;
        }
      }
      return {
        ...options,
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e("background")} style={sidebarBackground} />
        <div className={bem.e("content")}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex ml-3 mt-3">
              <img
                src={LogoWhite}
                width="37"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">Sparta ERP</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  tag={NavLink}
                  to={to}
                  activeClassName="activeside"
                  exact={exact}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span>{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {/* //Finance */}

            {/* Finance Condensed  */}

            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("FinanceCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdAttachMoney className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start">Finance </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenFinanceCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse
              isOpen={this.state.isOpenFinanceCondensed}
              className="ml-2"
            >
              {/* Finance Dropdowns */}

              {financeCondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* Warehouse Management */}

            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("WarehouseCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdHome className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start">Warehouse </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenWarehouseCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse
              isOpen={this.state.isOpenWarehouseCondensed}
              className="ml-2"
            >
              {warehouseCondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* Sales Management  */}

            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("SalesCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdPerson className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start">Sales </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenSalesCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenSalesCondensed} className="ml-2">
              {salesCondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* Purchase Management */}
            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("PurchaseCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdAddShoppingCart className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start">Purchase </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPurchaseCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse
              isOpen={this.state.isOpenPurchaseCondensed}
              className="ml-2"
            >
              {purchaseCondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* human rescources  */}

            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("HrCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdPeople className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start">
                    Human Rescources{" "}
                  </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenHrCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenHrCondensed} className="ml-2">
              {hrCondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* IT  */}

            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("ItCondensed")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdComputer className={bem.e("nav-item-icon")} />
                  <span className=" mt-1 align-self-start"> Admin </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenItCondensed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenItCondensed} className="ml-2">
              {itcondensed.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="activeside"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* set up  */}

            <NavItem key="settings" className={bem.e("nav-item")}>
              <BSNavLink
                tag={NavLink}
                to={routes.generalSettings}
                activeClassName="activeside"
              >
                <MdSettings className={bem.e("nav-item-icon")} />
                <span>Settings</span>
              </BSNavLink>
            </NavItem>

            {/* setup end  */}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
