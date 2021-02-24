import reducer, {
    initialState, resolveState, selectEditStatus, selectPRs, successFetch,
    requestEdit, successEdit, failureEdit
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('edit UOM', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(nextState).toEqual(result)
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request edit', () => {
        const nextState = reducer(initialState, requestEdit())
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success edit', () => {
        const UOMs = [{ id: 1, name: 'Default' }]
        const data= { id: 1, name: 'Updated' }
        var nextState = reducer(initialState, successFetch(UOMs))
        nextState = reducer(nextState, successEdit(data))
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectPRs(resolveState(nextState)))
            .toEqual([data])
    })

    test('should update state on failure edit', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureEdit(errors))
        expect(selectEditStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})