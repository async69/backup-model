import { Fetch as fetchSalesRegions } from "../store/Sales/Setup/SalesRegion/"
import { Fetch as fetchCustoemrs } from "../store/Sales/MasterData/Customer"

export default () => dispatch => {
    dispatch(fetchSalesRegions())
    dispatch(fetchCustoemrs())
}