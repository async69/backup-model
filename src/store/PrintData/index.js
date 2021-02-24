import { createSlice } from '@reduxjs/toolkit'

export const stateName = "printData"

export const initialState = {
    printData: []
}

export const printSlice = createSlice({
    name: stateName,
    initialState,
    reducers: {
        addPrintData(state, action) {
            state.printData = action.payload
        }
    }
})

export default printSlice.reducer

export const {
    addPrintData
} = printSlice.actions

export const resolveState = state => ({
    entities: { [stateName]: state }
})

export const unResolveState = state => state.entities[stateName]

export const selectPrintData = state => {
    const { printData } = unResolveState(state)
    return printData
}