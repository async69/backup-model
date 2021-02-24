import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/companies"
const Company = new StateArrayModel({ stateName: "companies" })

Company.createSlice()
Company.setURL(url)

export const {
    reducer,
    stateName
} = Company.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = Company.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = Company.getSelectors()

export const selectCompany = (state) => {
    const companies = selectData(state)
    console.log("companies", companies[0])
    if (!companies[0]) {
        console.log("No companies present for now")
        return null
    }

    if (companies[0].id) {
        return companies[0].id
    }
}

export default reducer