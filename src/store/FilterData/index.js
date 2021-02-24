import { createSlice } from '@reduxjs/toolkit'
import { filterTypes } from '../../config/filterTypes'

export const stateName = "filterOptions"
export const initialState = {
    options: {},
    filteredData: []
}

export const _filterSelect = (data, options) => {
    var filtered = []
    data.forEach(item => {
        for (var prop in options) {
            var flags = options[prop]
            switch (flags.filterType) {
                case filterTypes.SELECT: {
                    if (item[flags.tag] === flags.value) {
                        filtered.push(item)
                    }
                    break
                }

                case filterTypes.STRING_SELECT: {
                    const itemString = item[flags.tag]
                    if (itemString.match(new RegExp("^" + flags.value, "gi"))) {
                        filtered.push(item)
                    }
                    break
                }

                case filterTypes.DATE_SELECT_START: {
                    const filterDate = new Date(flags.value)
                    const postedDate = new Date(item[flags.tag])
                    if (filterDate.getFullYear() < postedDate.getFullYear()) {
                        filtered.push(item)
                    } else if (filterDate.getFullYear() === postedDate.getFullYear()) {
                        if (filterDate.getMonth() < postedDate.getMonth()) {
                            filtered.push(item)
                        } else if (filterDate.getMonth() === postedDate.getMonth()) {
                            if (filterDate.getDate() <= postedDate.getDate()) {
                                filtered.push(item)
                            }
                        }
                    }
                    break
                }

                case filterTypes.DATE_SELECT_END: {
                    const filterDate = new Date(flags.value)
                    const postedDate = new Date(item[flags.tag])
                    if (filterDate.getFullYear() > postedDate.getFullYear()) {
                        filtered.push(item)
                    } else if (filterDate.getFullYear() === postedDate.getFullYear()) {
                        if (filterDate.getMonth() > postedDate.getMonth()) {
                            filtered.push(item)
                        } else if (filterDate.getMonth() === postedDate.getMonth()) {
                            if (filterDate.getDate() >= postedDate.getDate()) {
                                filtered.push(item)
                            }
                        }
                    }
                    break
                }

                default: return filtered
            }
        }
    })
    return filtered
}


const filterSlice = createSlice({
    name: stateName,
    initialState,
    reducers: {
        addOption(state, action) {
            const { key, value, tag, filterType } = action.payload
            state.options = {
                ...state.options,
                [key]: {
                    value, tag, filterType
                }
            }
        },
        filter(state, action) {
            var response = action.payload
            for (var prop in state.options) {
                response = _filterSelect(response, {
                    [prop]: state.options[prop]
                })
            }
            state.filteredData = response
        }
    }
})

export const {
    addOption, filter
} = filterSlice.actions

export default filterSlice.reducer

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectOption = (state, id) => {
    const { options } = unResolveState(state)
    return options[id]
}

export const selectOptions = state => {
    const { options } = unResolveState(state)
    return options
}

export const selectFilteredData = state => {
    const { filteredData,
        // options
    } = unResolveState(state)
    return filteredData
}