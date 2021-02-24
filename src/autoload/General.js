import { Fetch as fetchNumberSeries } from "../store/GeneralSetup/NumberSeries";
import { Fetch as fetchInventoryPostingGroups } from "../store/GeneralSetup/Posting/InventoryPostingGroups";
import { Fetch as fetchCostingMethods } from "../store/GeneralSetup/CostingMethods";
import { Fetch as fetchPermissions } from "../store/Permissions/Mocked/";
import { Fetch as fetchCities } from "store/GeneralSetup/Cities";
import { Fetch as fetchDocumentTypes } from "../store/GeneralSetup/DocumentType/";
import { Fetch as fetchCountries } from "../store/GeneralSetup/Countries";

export default () => (dispatch) => {
  dispatch(fetchNumberSeries());
  dispatch(fetchInventoryPostingGroups());
  dispatch(fetchCostingMethods());
  dispatch(fetchPermissions());
  dispatch(fetchCities());
  dispatch(fetchDocumentTypes());
  dispatch(fetchCountries());
};
