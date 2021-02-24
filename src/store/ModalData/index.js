import React, { Fragment } from "react"
import { createSlice } from "@reduxjs/toolkit"
import { ConfirmAlert } from "../../pages/common/ConfirmAlert"

export const stateName = "modalData"

export const initialState = {
    modalData: {
        openModal: false,
        data: {},
        options: {},
        isDone: false,
        title: "",
        submit: (data) => null,
        Component: <Fragment />,
        okCallback: (value) => null,
        cancelCallback: (value) => null,
        // toggle: toggle
    }
}

const ModalSlice = createSlice({
    name: stateName,
    reducers: {
        toggle(state, action) {
            const {
                type, data, title, Component, submit, _toggle, isDone, deleteOptions,
                options
            } = action.payload
            switch (type) {
                case "OPEN": {
                    state.modalData = {
                        ...state.modalData,
                        openModal: true,
                        title,
                        data,
                        Component: <Component toggle={_toggle} />
                    }
                    break
                }
                case "ADD": {
                    state.modalData = {
                        ...state.modalData,
                        openModal: true,
                        title,
                        data,
                        submit,
                        isDone,
                        options,
                        Component: <Component submit={submit} options={options} />
                    }
                    break
                }
                case "VIEW": {
                    state.modalData = {
                        ...state.modalData,
                        openModal: true,
                        title,
                        data,
                        options,
                        Component: <Component disabled={true} data={data} isView={true} options={options} />
                    }
                    break
                }
                case "EDIT": {
                    state.modalData = {
                        ...state.modalData,
                        openModal: true,
                        title,
                        data,
                        isDone,
                        options,
                        Component: <Component isEdit={true} data={data} submit={submit} options={options} />
                    }
                    break
                }
                case "DELETE": {
                    const { okCallback, cancelCallback, title, id, message } = deleteOptions
                    ConfirmAlert({ okCallback, errCallback: cancelCallback, title, id, message })
                    break
                }
                case "CLOSE": {
                    state.modalData = {
                        ...state.modalData,
                        openModal: false
                    }
                    break
                }

                default:
                    break
            }
        }
    },
    initialState
})

export const {
    toggle
} = ModalSlice.actions

export default ModalSlice.reducer

export const resolveState = (state) => ({
    entities: { [stateName]: state },
})

export const unResolveState = (state) => state.entities[stateName]

export const selectData = state => {
    const { modalData } = unResolveState(state)
    return modalData
}