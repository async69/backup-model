import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";

const WHTReport = new StateArrayModel({ stateName: "income_statement" });

WHTReport.createSlice();
WHTReport.setURL("/income-statement");

export const { reducer, stateName } = WHTReport.getEntity();

export const { Add, Fetch, Edit, Remove } = WHTReport.getAPIHandles();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = WHTReport.getSelectors();

export { selectData as selectWHTReports };
