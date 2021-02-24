import {
  stateName as number_series,
  reducer as NumberSeriesReducer,
} from "../GeneralSetup/NumberSeries";
import {
  stateName as inventory_posting_setup,
  reducer as InventoryPostingSetupReducer,
} from "../GeneralSetup/Posting/InventoryPostingSetups";
import {
  stateName as costing_method,
  reducer as CostingMethodReducer,
} from "../GeneralSetup/CostingMethods/";
import {
  stateName as entryType,
  reducer as EntitiyReducer,
} from "../GeneralSetup/EntryType/";
import {
  stateName as accountType,
  reducer as AccountTypeReducer,
} from "../GeneralSetup/AccountTypes";
import {
  stateName as document_type,
  reducer as DocumentTypeReducer
} from "../GeneralSetup/DocumentType"

export default {
  [number_series]: NumberSeriesReducer,
  [inventory_posting_setup]: InventoryPostingSetupReducer,
  [costing_method]: CostingMethodReducer,
  [entryType]: EntitiyReducer,
  [accountType]: AccountTypeReducer,
  [document_type]: DocumentTypeReducer
};
