export const statusTypes = {
    ADD: "ADDING_LINE",
    IDLE: "IDLE",
    EDIT: "EDIT",
    SAVED: "SAVED",
    CANCELED: "CANCELED",
};

export const initialState = {
    addCount: 0,
    status: statusTypes.IDLE,
    hasEdit: true,
    hasDelete: true,
    _data: []
}

export const constants = {
    ADD: "_ADD",
    UPDATE: "UPDATE"
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD: {
            return {
                ...state,
                addCount: state.addCount + 1,
                status: statusTypes.ADD
            }
        }

        case constants.UPDATE: {
            return {
                ...state,
                _data: action.payload
            }
        }

        default: return state
    }
}

export const addLine = (dispatch) => dispatch({ type: constants.ADD })

export const updateData = (data) => dispatch => {
    dispatch({ type: constants.UPDATE, payload: data })
}

export const getData = (state) => state._data