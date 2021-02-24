import { Fetch as fetchVendors } from "../store/Purchase/MasterData/Vendor/";
import { Fetch as fetchVendorTypes } from "../store/Purchase/Setup/VendorType/"
import { Fetch as fetchPurchaseTypes } from "../store/Purchase/Setup/PurchaseType"

export default () => (dispatch) => {
  dispatch(fetchVendors());
  dispatch(fetchVendorTypes())
  dispatch(fetchPurchaseTypes())
};
