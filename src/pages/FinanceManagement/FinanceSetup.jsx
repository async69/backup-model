import React from "react";
import { Row, Col, Card, CardText, CardTitle } from "reactstrap";
import Page from "../../components/Page";
import routes from "config/routes/index";
import { Link } from "react-router-dom";
import {
  MdDateRange,
  MdAccessTime,
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdList,
  MdAccountBalance,
  MdPerson,
  MdAssignment,
  MdContentPaste,
  MdFeaturedVideo,
  MdLowPriority,
  MdHome,
} from "react-icons/md";

const FinanceSetupitems = [
  {
    title: "Fiscal Year",
    subtitle: "Fiscal Year Configurations",
    link: routes.fiscalYear,
    width: 4,
    icon: <MdDateRange size={80} className="text-dark" />,
  },
  {
    title: "Period",
    subtitle: "Period Description",
    link: routes.period,
    width: 4,
    icon: <MdAccessTime size={80} className="text-dark" />,
  },
  {
    title: "VAT",
    subtitle: "VAT Configurations",
    link: routes.vatFinance,
    width: 4,
    icon: <MdAttachMoney size={80} className="text-dark" />,
  },
  {
    title: "Withholding Tax",
    subtitle: "Withholding Tax Configurations",
    link: routes.WithholdingTax,
    width: 4,
    icon: <MdAttachMoney size={80} className="text-dark" />,
  },
  {
    title: "Account Type",
    subtitle: "Account Type Configurations",
    link: routes.accountType,
    width: 4,
    icon: <MdAccountBalanceWallet size={80} className="text-dark" />,
  },
  {
    title: "Charts of Account Type",
    subtitle: "COA Type Configurations",
    link: routes.ChartsOfAccountType,
    width: 4,
    icon: <MdList size={80} className="text-dark" />,
  },
  {
    title: "Banks",
    subtitle: "List Of Banks",
    link: routes.banks,
    width: 4,
    icon: <MdAccountBalance size={80} className="text-dark" />,
  },
];

const PostingGroupSetups = [
  {
    title: "Customer Posting Group ",
    subtitle: "Customer Posting Group Configurations",
    link: routes.CustomerPostingGroup,
    width: 4,
    icon: <MdPerson size={80} className="text-dark" />,
  },
  {
    title: "Vendor Posting Group ",
    subtitle: "Vendor Posting Group Configurations",
    link: routes.vendorPostingGroup,
    width: 4,
    icon: <MdPerson size={80} className="text-dark" />,
  },
  {
    title: "VAT Posting Group ",
    subtitle: "VAT Posting group Configurations",
    link: routes.VatPostingGroup,
    width: 4,
    icon: <MdLowPriority size={80} className="text-dark" />,
  },
  {
    title: "General Posting Group",
    subtitle: "General Posting Group Configurations",
    link: routes.generalPostingGroup,
    width: 4,
    icon: <MdAssignment size={80} className="text-dark" />,
  },
  {
    title: "Inventory Posting Group",
    subtitle: "Inventory Posting Group Configurations",
    link: routes.inventoryPostingGroup,
    width: 4,
    icon: <MdFeaturedVideo size={80} className="text-dark" />,
  },
  {
    title: "General Product Posting",
    subtitle: "General Product Posting Configurations",
    link: routes.GeneralProductPosting,
    width: 4,
    icon: <MdContentPaste size={80} className="text-dark" />,
  },
  {
    title: "Inventory Posting Setup",
    subtitle: "Inventory Posting Setups Configurations",
    link: routes.InventoryPostingSetup,
    width: 4,
    icon: <MdHome size={80} className="text-dark" />,
  },
];

const FinanceSetup = () => {
  return (
    <Page className="mt-4" title="Finance Settings">
      <hr />
      <Row>
        {FinanceSetupitems.map((setups, index) => {
          return (
            <Col key={index} md={setups.width} sm={6} xs={12}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: setups.link }}
              >
                <Card className="shadow_ settingsCard">
                  <Row>
                    <Col md={3} sm={6} xs={12}>
                      {setups.icon}
                    </Col>
                    <Col md={9} sm={6} xs={12}>
                      <CardTitle className="text-title">
                        <h5>
                          <b>{setups.title} </b>
                        </h5>
                      </CardTitle>
                      <CardText className="mb-3 ml-2 ">
                        <h7>{setups.subtitle}</h7>{" "}
                      </CardText>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Col className="mt-3" md={12} xs={12} sm={12}>
        <h4 className="m-3">Posting Group Setups</h4>
        <hr />
      </Col>
      <Row>
        {PostingGroupSetups.map((postingGroups, index) => {
          return (
            <Col key={index} md={postingGroups.width} sm={6} xs={12}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: postingGroups.link }}
              >
                <Card className="shadow_ settingsCard">
                  <Row>
                    <Col md={3} sm={6} xs={12}>
                      {postingGroups.icon}
                    </Col>
                    <Col md={9} sm={6} xs={12}>
                      <CardTitle className="text-title">
                        <h5>
                          <b>{postingGroups.title} </b>
                        </h5>
                      </CardTitle>
                      <CardText className="mb-3 ml-2 ">
                        <h7>{postingGroups.subtitle}</h7>{" "}
                      </CardText>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Page>
  );
};

export default FinanceSetup;
