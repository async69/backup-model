import { generateArray, types, tags, metaTags } from "../../../helpers/Generator/"
import { availableDepartments } from "../../../constants/departments"

const props = {
  id: {
    type: types.string, tag: tags.id
  },
  firstName: {
    type: types.string, tag: tags.name, metaTag: metaTags.firstName
  },
  lastName: {
    type: types.string, tag: tags.name, metaTag: metaTags.lastName
  },
  department: {
    type: types.enum, payload: Object.values(availableDepartments)
  },
  remarks: { 
    type: types.string
  }
}

export const customers = () => {
  const fetchedData = generateArray(16, props)
  return {
    count: fetchedData.length,
    results: fetchedData.slice(0, 5)
  }
}