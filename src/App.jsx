import React from "react";
import GAListener from "./components/GAListener";
import { EmptyLayout, LayoutRoute, MainLayout } from "./components/Layout";
import PageSpinner from "./components/PageSpinner";
import componentQueries from "react-component-queries";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./styles/sparta.scss";
import routes from "config/routes/index";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { ToastContainer, Zoom } from "react-toastify";
// import { PDFProvider } from "./pages/Finance/PDF/PDFContext";
import { loadPermissions } from "./autoload";
import config from "./static/config/defaults";
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const HumanrescourcesDashboard = React.lazy(() =>
  import("./pages/DashboardPage/HumanrescourcesDashboard")
);

const PurchaseDashboard = React.lazy(() =>
  import("./pages/DashboardPage/PurchaseDashboard")
);

const SalesDashboard = React.lazy(() =>
  import("./pages/DashboardPage/SalesDashboard/")
);
const WarehouseDashboard = React.lazy(() =>
  import("./pages/DashboardPage/WarehouseDashboard/index")
);

// PDF
// ================= FINANCE IMPORTS =================

const FinanceDashboard = React.lazy(() =>
  import("./pages/DashboardPage/FinanceDashboard/")
);
const FinanceMasterData = React.lazy(() =>
  import("./pages/FinanceManagement/MasterData")
);
const FinanceJournals = React.lazy(() =>
  import("./pages/FinanceManagement/FinanceJournals")
);
const FinanceSalesProcess = React.lazy(() =>
  import("./pages/FinanceManagement/SalesProcess")
);
const FinancePurchasceProcess = React.lazy(() =>
  import("./pages/FinanceManagement/PurchaseProcess")
);
const FinanceLedgerEntries = React.lazy(() =>
  import("./pages/FinanceManagement/LedgerEntries")
);
const FinanceCashManagement = React.lazy(() =>
  import("./pages/FinanceManagement/CashManagement")
);
const FinanceInventory = React.lazy(() =>
  import("./pages/FinanceManagement/FinanceInventory")
);
const FinanceFixedAssetManagement = React.lazy(() =>
  import("./pages/FinanceManagement/FixedAssetManagement")
);
const FinanceReports = React.lazy(() =>
  import("./pages/FinanceManagement/Reports")
);
const FinanceSetup = React.lazy(() =>
  import("./pages/FinanceManagement/FinanceSetup")
);

// FinanceSetup

const FiscalYear = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/FiscalYear/")
);
const Period = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/Period/")
);
const VAT = React.lazy(() => import("./pages/FinanceManagement/Setup/VAT"));

const WithholdingTax = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/WithholdingTax/")
);

const AccountType = React.lazy(() =>
  import("./pages/GeneralSetup/AccountType")
);

const ChartsOfAccountType = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/ChartsOfAccountType")
);
// const CustomerPosting = React.lazy(() =>
//   import("./pages/FinanceManagement/Setup/CustomerPosting/")
// );
const VendorPostingGroup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/VendorPostingGroup/")
);
const VatPostingGroup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/VatPostingGroup")
);
const CustomerPostingGroup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/CustomerPosting/")
);

const GeneralPostingGroup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/GeneralPostingGroup/")
);

const InventoryPostingGroup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/InventoryPostingGroup/")
);

const InventoryPostingSetup = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/InventoryPostingSetup/")
);

const GeneralProductPosting = React.lazy(() =>
  import("./pages/FinanceManagement/Setup/GeneralProductPostingGroup/")
);

const BalanceSheet = React.lazy(() =>
  import("./pages/FinanceManagement/Reports/BalanceSheet")
);
const IncomeStatement = React.lazy(() =>
  import("./pages/FinanceManagement/Reports/IncomeStatement")
);
const WHTReport = React.lazy(() =>
  import("./pages/FinanceManagement/Reports/WHTReport")
);
const TrialBalance = React.lazy(() =>
  import("./pages/FinanceManagement/Reports/TrialBalance")
);

// ================= WAREHOUSE MANAGEMENT IMPORTS =================
const WarehouseMasterdata = React.lazy(() =>
  import("./pages/WarehouseManagement/WarehouseMasterdata")
);
const WarehouseInventoryControl = React.lazy(() =>
  import("./pages/WarehouseManagement/WarehouseInventoryControl")
);
const WarehouseCommon = React.lazy(() =>
  import("./pages/WarehouseManagement/WarehouseCommon")
);
const WarehouseSetup = React.lazy(() =>
  import("./pages/WarehouseManagement/WarehouseSetup")
);

const Warehouse = React.lazy(() =>
  import("./pages/WarehouseManagement//Setup/Location/Warehouse/")
);
const Bin = React.lazy(() =>
  import("./pages/WarehouseManagement//Setup/Location/Bin/")
);
const UOM = React.lazy(() => import("./pages/WarehouseManagement/Setup/UOM/"));
const UOMConversion = React.lazy(() =>
  import("./pages/WarehouseManagement/Setup/UOMConversion/")
);

// ================= PURCHASE MANAGEMENT IMPORTS =================
const PurchaseMasterData = React.lazy(() =>
  import("./pages/PurchaseManagement/PurchaseMasterData")
);
const PurchaseCommon = React.lazy(() =>
  import("./pages/PurchaseManagement/PurchaseCommon")
);
const PurchaseSetup = React.lazy(() =>
  import("./pages/PurchaseManagement/PurchaseSetup")
);
// ================= SALES IMPORTS =================
const SalesCustomers = React.lazy(() =>
  import("./pages/SalesManagement/MasterData/Customers/")
);
const SalesOrder = React.lazy(() =>
  import("./pages/SalesManagement/Common/SalesOrder/")
);
const SalesSetup = React.lazy(() =>
  import("./pages/SalesManagement/SalesSetup")
);
// ================= GENERAL SETTINGS IMPORTS =================
const GeneralSettings = React.lazy(() =>
  import("./pages/GeneralSetup/GeneralSettings")
);

const NumberSeries = React.lazy(() =>
  import("./pages/GeneralSetup/NumberSeries/")
);

const Country = React.lazy(() => import("./pages/GeneralSetup/Country/"));

const Region = React.lazy(() => import("./pages/GeneralSetup/Region/"));

const City = React.lazy(() => import("./pages/GeneralSetup/City/"));

// const AccountType = React.lazy(() =>
//   import("./pages/GeneralSetup/AccountType/")
// );

const Company = React.lazy(() => import("./pages/GeneralSetup/Company/"));

const Currency = React.lazy(() => import("./pages/GeneralSetup/Currency/"));

const Status = React.lazy(() => import("./pages/GeneralSetup/Status/"));
const EntryType = React.lazy(() => import("./pages/GeneralSetup/EntryType/"));

const CostingMethod = React.lazy(() =>
  import("./pages/GeneralSetup/CostingMethod/")
);
// ================= HR IMPORTS =================
const Applicants = React.lazy(() =>
  import("./pages/HumanResourceManagement/ResourceManagement/Applicants")
);
// +++++++++++ resource management
const Employees = React.lazy(() =>
  import("./pages/HumanResourceManagement/ResourceManagement/Employee/")
);
const SingleEmployee = React.lazy(() =>
  import(
    "./pages/HumanResourceManagement/ResourceManagement/Employee/SingleEmployee/"
  )
);
const HRDepartments = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Department")
);

// +++++++++++ payroll

const PayrollManagement = React.lazy(() =>
  import("./pages/HumanResourceManagement/PayrollManagement/")
);
const SinglePayrollManagement = React.lazy(() =>
  import("./pages/HumanResourceManagement/PayrollManagement/SingleEmployee/")
);

const PayrollProcess = React.lazy(() =>
  import("./pages/HumanResourceManagement/PayrollManagement/PayRollProcess")
);

// +++++++++++ reports
const Report = React.lazy(() =>
  import("./pages/HumanResourceManagement/Report/")
);
// +++++++++++ HR setup
const SetupHR = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/SetupHR")
);
const HRDepartmentsSetup = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Department")
);
const PositionType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Position")
);
const PositionLevel = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/PositionLevel/")
);
const TerminationType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/TerminationType")
);
const DisciplinaryActionType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/DisciplinaryActionType")
);
const CertificationType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/CertificationType")
);
const QualificationType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/QualificationType")
);
const QualificationLevelType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/QualificationLevelType")
);
const EducationType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/EducationType")
);
const TrainingType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/TrainingType")
);
const Institution = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Institution")
);
const Language = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Language")
);
const ConsignmentType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/ConsignmentType")
);
const IllnessType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/IllnessType")
);
const UnitofDuration = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/UnitofDuration")
);
const Nationality = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/Nationality")
);
const LeaveType = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/LeaveType")
);
const EmployeeStatus = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/EmployeeStatus")
);

const SalaryIncomeTax = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/SalaryIncomeTax")
);

const PayrollRate = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/PayrollRate")
);

const PayrollPostiongGroup = React.lazy(() =>
  import("./pages/HumanResourceManagement/Setup/PayrollPostingGroup")
);

const IT = React.lazy(() => import("./pages/IT/EmployeeTabs"));
const Banks = React.lazy(() =>
  import("./pages/FinanceManagement/MasterData/Banks")
);

// It

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};
export const store = configureStore();
if (config.enableAutoload) {
  store.dispatch(loadPermissions());
} else {
  console.log("Autoload Disabled");
}
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          transition={Zoom}
          rtl={false}
          pauseOnFocusLoss
          closeButton={false}
          draggable
          pauseOnHover
        />
        {/* <PDFProvider> */}
        <BrowserRouter basename={getBasename()}>
          <GAListener>
            <Switch>
              <LayoutRoute exact path="/login" layout={EmptyLayout} />
              <LayoutRoute exact path="/signup" layout={EmptyLayout} />
              <MainLayout breakpoint={this.props.breakpoint}>
                <React.Suspense fallback={<PageSpinner />}>
                  <Route
                    exact
                    path={routes.homePage}
                    component={DashboardPage}
                  />
                  {/*  ================= FINANCE MANAGEMENT ROUTES ================= */}
                  <Route
                    exact
                    path={routes.financeDashboard}
                    component={FinanceDashboard}
                  />
                  <Route
                    exact
                    path={routes.financeMasterData}
                    component={FinanceMasterData}
                  />
                  <Route
                    exact
                    path={routes.financeJournals}
                    component={FinanceJournals}
                  />
                  <Route
                    exact
                    path={routes.financeSalesProces}
                    component={FinanceSalesProcess}
                  />
                  <Route
                    exact
                    path={routes.financePurchaseProcess}
                    component={FinancePurchasceProcess}
                  />
                  <Route
                    exact
                    path={routes.financeLedgerEntries}
                    component={FinanceLedgerEntries}
                  />
                  <Route
                    exact
                    path={routes.financeCashManagement}
                    component={FinanceCashManagement}
                  />
                  <Route
                    exact
                    path={routes.financeFixedAssetManagement}
                    component={FinanceFixedAssetManagement}
                  />
                  <Route
                    exact
                    path={routes.financeInventory}
                    component={FinanceInventory}
                  />
                  <Route
                    exact
                    path={routes.financeReports}
                    component={FinanceReports}
                  />
                  <Route
                    exact
                    path={routes.financeSetup}
                    component={FinanceSetup}
                  />
                  <Route
                    exact
                    path={routes.costingMethod}
                    component={CostingMethod}
                  />
                  {/* finance Settings  */}
                  <Route
                    exact
                    path={routes.fiscalYear}
                    component={FiscalYear}
                  />
                  <Route exact path={routes.period} component={Period} />
                  <Route exact path={routes.vatFinance} component={VAT} />
                  <Route
                    exact
                    path={routes.WithholdingTax}
                    component={WithholdingTax}
                  />
                  <Route
                    exact
                    path={routes.accountType}
                    component={AccountType}
                  />
                  <Route
                    exact
                    path={routes.ChartsOfAccountType}
                    component={ChartsOfAccountType}
                  />
                  <Route
                    exact
                    path={routes.CustomerPostingGroup}
                    component={CustomerPostingGroup}
                  />
                  <Route
                    exact
                    path={routes.vendorPostingGroup}
                    component={VendorPostingGroup}
                  />
                  <Route
                    exact
                    path={routes.VatPostingGroup}
                    component={VatPostingGroup}
                  />
                  <Route
                    exact
                    path={routes.generalPostingGroup}
                    component={GeneralPostingGroup}
                  />
                  <Route
                    exact
                    path={routes.inventoryPostingGroup}
                    component={InventoryPostingGroup}
                  />
                  <Route
                    exact
                    path={routes.InventoryPostingSetup}
                    component={InventoryPostingSetup}
                  />
                  <Route
                    exact
                    path={routes.GeneralProductPosting}
                    component={GeneralProductPosting}
                  />
                  <Route exact path={routes.banks} component={Banks} />
                  {/* finance Reports  */}
                  <Route
                    exact
                    path={routes.balanceSheet}
                    component={BalanceSheet}
                  />
                  <Route
                    exact
                    path={routes.incomeStatement}
                    component={IncomeStatement}
                  />
                  <Route exact path={routes.WHTReport} component={WHTReport} />
                  <Route
                    exact
                    path={routes.trialBalance}
                    component={TrialBalance}
                  />
                  {/*  ================= WAREHOUSE MANAGEMENT ROUTES ================= */}
                  <Route
                    exact
                    path={routes.warehouseDashboard}
                    component={WarehouseDashboard}
                  />
                  <Route
                    exact
                    path={routes.warehouseMasterdata}
                    component={WarehouseMasterdata}
                  />
                  <Route
                    exact
                    path={routes.warehouseCommon}
                    component={WarehouseCommon}
                  />{" "}
                  <Route
                    exact
                    path={routes.warehouseInventoryControl}
                    component={WarehouseInventoryControl}
                  />{" "}
                  <Route
                    exact
                    path={routes.warehouseSetup}
                    component={WarehouseSetup}
                  />
                  <Route exact path={routes.warehouse} component={Warehouse} />
                  <Route exact path={routes.bin} component={Bin} />
                  {/* <Route exact path={routes.warehouseSetup} component={UOM} /> */}
                  <Route exact path={routes.uom} component={UOM} />
                  <Route
                    exact
                    path={routes.uomConversion}
                    component={UOMConversion}
                  />
                  {/*  ================= PURCHASE MANAGEMENT ROUTES ================= */}
                  <Route
                    exact
                    path={routes.purchaseDashboard}
                    component={PurchaseDashboard}
                  />
                  <Route
                    exact
                    path={routes.purchaseMasterData}
                    component={PurchaseMasterData}
                  />
                  <Route
                    exact
                    path={routes.purchaseCommon}
                    component={PurchaseCommon}
                  />
                  <Route
                    exact
                    path={routes.purchaseSetup}
                    component={PurchaseSetup}
                  />
                  {/*  ================= SALES MANAGEMENT ROUTES ================= */}
                  <Route
                    exact
                    path={routes.salesCustomers}
                    component={SalesCustomers}
                  />
                  <Route
                    exact
                    path={routes.salesDashboard}
                    component={SalesDashboard}
                  />
                  <Route
                    exact
                    path={routes.salesOrder}
                    component={SalesOrder}
                  />
                  <Route
                    exact
                    path={routes.salesSetup}
                    component={SalesSetup}
                  />
                  {/* General Setup  */}
                  <Route
                    exact
                    path={routes.numberSeries}
                    component={NumberSeries}
                  />
                  <Route exact path={routes.country} component={Country} />
                  <Route exact path={routes.region} component={Region} />
                  <Route exact path={routes.city} component={City} />
                  <Route exact path={routes.company} component={Company} />
                  <Route exact path={routes.currency} component={Currency} />
                  <Route exact path={routes.status} component={Status} />
                  <Route exact path={routes.entryType} component={EntryType} />
                  <Route
                    exact
                    path={routes.generalSettings}
                    component={GeneralSettings}
                  />
                  {/*  ================= HR ROUTES ================= */}
                  <Route
                    exact
                    path={routes.humanrescourcesDashboard}
                    component={HumanrescourcesDashboard}
                  />
                  <Route
                    exact
                    path={routes.appilicants}
                    component={Applicants}
                  />
                  <Route
                    exact
                    path={routes.payrollManagement}
                    component={PayrollManagement}
                  />
                  <Route
                    exact
                    path={routes.singlePayrollManagement}
                    component={SinglePayrollManagement}
                  />
                  <Route
                    exact
                    path={routes.payrollProcess}
                    component={PayrollProcess}
                  />
                  {/* ================= HR  ROUTES =================  */}
                  <Route exact path={routes.employees} component={Employees} />
                  <Route
                    exact
                    path={routes.singleEmployee}
                    component={SingleEmployee}
                  />
                  <Route
                    exact
                    path={routes.departments}
                    component={HRDepartments}
                  />
                  <Route exact path={routes.setupHR} component={SetupHR} />
                  <Route exact path={routes.reports_hr} component={Report} />
                  {/* +++++++++++ Setup Routes +++++++++++ */}
                  <Route
                    exact
                    path={routes.HRDepartmentSetup}
                    component={HRDepartmentsSetup}
                  />
                  <Route
                    exact
                    path={routes.positionType}
                    component={PositionType}
                  />
                  <Route
                    exact
                    path={routes.positionLevel}
                    component={PositionLevel}
                  />
                  <Route
                    exact
                    path={routes.terminationType}
                    component={TerminationType}
                  />
                  <Route
                    exact
                    path={routes.disciplinaryActionType}
                    component={DisciplinaryActionType}
                  />
                  <Route
                    exact
                    path={routes.certificationType}
                    component={CertificationType}
                  />
                  <Route
                    exact
                    path={routes.qualificationType}
                    component={QualificationType}
                  />
                  <Route
                    exact
                    path={routes.qualificationLevelType}
                    component={QualificationLevelType}
                  />
                  <Route
                    exact
                    path={routes.educationType}
                    component={EducationType}
                  />
                  <Route
                    exact
                    path={routes.trainingType}
                    component={TrainingType}
                  />
                  <Route
                    exact
                    path={routes.institution}
                    component={Institution}
                  />
                  <Route exact path={routes.language} component={Language} />
                  <Route
                    exact
                    path={routes.consignmentType}
                    component={ConsignmentType}
                  />
                  <Route
                    exact
                    path={routes.illnessType}
                    component={IllnessType}
                  />
                  <Route
                    exact
                    path={routes.unitOfDuration}
                    component={UnitofDuration}
                  />
                  <Route
                    exact
                    path={routes.nationality}
                    component={Nationality}
                  />
                  <Route
                    exact
                    path={routes.employeeStatus}
                    component={EmployeeStatus}
                  />
                  <Route
                    exact
                    path={routes.payrollPostingGroup}
                    component={PayrollPostiongGroup}
                  />
                  <Route
                    exact
                    path={routes.payrollRate}
                    component={PayrollRate}
                  />
                  <Route
                    exact
                    path={routes.salaryIncomeTax}
                    component={SalaryIncomeTax}
                  />
                  <Route exact path={routes.leaveType} component={LeaveType} />
                  {/* IT */}
                  <Route exact path={routes.it} component={IT} />
                </React.Suspense>
              </MainLayout>
              <Redirect to={routes.homePage} />
            </Switch>
          </GAListener>
        </BrowserRouter>
        {/* </PDFProvider> */}
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
