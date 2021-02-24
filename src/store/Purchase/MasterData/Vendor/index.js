import StateArrayModel from "../../../../wrappers/StateModels/StateArrayModel";
import { simulateLogic } from "./logic";

const Vendors = new StateArrayModel({ stateName: "new_exclusive_vendors" });
Vendors.setURL("/vendors");

const defaultMapper = (data) => ({
  ...data,
  vendor_name: data.name,
  tin_number: String(data.tin_number),
  currency: data.currency.id,
  vendor_posting_group_detail: data.vendor_posting_group,
  vat_posting_group_detail: data.vat_posting_group,
  vendor_type_detail: data.vender_type,
  addresses: data.vendor_address_lines.map((line) => ({
    ...line,
    region: {
      ...line.region,
      name: line.region.region_name,
      id: line.region.region_id,
    },
    country: {
      ...line.country,
      name: line.country.country_name,
      id: line.country.country_id,
    },
    postal_code: line.p_o_box,
    office_telephone_no: line.office_telephone_number,
    is_head_office: line.is_head_office,
  })),
  contacts: data.vendor_contact_lines.map((line) => ({
    ...line,
    mob_number: line.mobile_phone_number,
  })),
});

const defaultAPICall = (data) => ({
  ...data,
  vender_type: data.vendor_type,
  vendor_address_lines: data.addresses.map((line) => ({
    ...line,
    p_o_box: line.postal_code,
    is_head_office: Boolean(line.is_head_office === "Yes"),
    office_telephone_number: line.office_telephone_no,
  })),
  vendor_contact_lines: data.contacts.map((line) => ({
    ...line,
    name: line.name,
    mobile_phone_number: line.mob_number,
  })),
});

Vendors.setAPIResponses({
  Fetch: (response) => {
    return response.map((data) => defaultMapper(data));
  },
  Add: (response) => defaultMapper(response),
  Edit: (response) => defaultMapper(response),
});

Vendors.setAPICalls({
  Add: (data) => defaultAPICall(data),
  Edit: (data) => defaultAPICall(data),
});

Vendors.createSlice();

Vendors.enableCustomAct((dispatch, action) => {
  const response = Vendors.getAPICallType(action.payload.onSuccess);
  if (response) {
    const { type, apiType } = response;
    simulateLogic({
      type,
      apiType,
      dispatch,
      action,
    });
  }
});

Vendors.toggleCustomAct(false);

export const { stateName, reducer } = Vendors.getEntity();
export const { Add, Fetch, Edit, Remove, Patch } = Vendors.getAPICalls();

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = Vendors.getSelectors();

export const { getLoading } = Vendors

export { selectData as selectVendors };
