import { generateArray, types, tags } from "../../../helpers/Generator/"
import { availableDepartments } from "../../../constants/departments"
import { fetchPermissions } from "../../../helpers/binaryConvertor"
import features from "../../../constants/features"

let props = {
  id: {
    type: types.string, tag: tags.id
  },
}
Object.values(features).forEach(feature => {
  props[feature] = {
    type: types.number, max: 15, min: 0
  }
})

let mappedPermissions = {}
generateArray(Object.values(availableDepartments).length, props).map((prop, idx) => {
  let objectSet = {}
  for (var item in prop) {
    if (item !== "id") {
      objectSet[item] = fetchPermissions(prop[item])
    }
  }
  const key = Object.values(availableDepartments)[idx]
  mappedPermissions[key] = objectSet
  return objectSet
})

export const customers = () => {
  return {
    count: 1,
    results: mappedPermissions
  }
}