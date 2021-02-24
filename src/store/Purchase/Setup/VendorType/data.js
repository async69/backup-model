import { generateArray, types, tags, metaTags } from "../../../../helpers/Generator/"

const props = {
    id: {
        type: types.string, tag: tags.id
    },
    name: {
        type: types.string, tag: tags.name, metaTag: metaTags.fullName
    },
    code: {
        type: types.string,
    },
    remarks: {
        type: types.string, tag: tags.name
    },
    created_at: {
        type: types.timestamp
    },
    updated_at: {
        type: types.timestamp
    },
}

export default () => {
    const fetchedData = generateArray(22, props)
    return {
        count: fetchedData.length,
        results: fetchedData.slice(0, 5)
    }
}