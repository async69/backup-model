import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel"

const url = "/document-types"
const DocumentType = new StateArrayModel({ stateName: "new_document_types" })

DocumentType.createSlice()
DocumentType.setURL(url)

export const {
    reducer,
    stateName
} = DocumentType.getEntity()

export const {
    Add, Fetch, Edit, Remove
} = DocumentType.getAPIHandles()

export const {
    selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus,
    selectData
} = DocumentType.getSelectors()

export { selectData as selectDocumentTypes }