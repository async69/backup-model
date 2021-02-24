import reducer, {
    initialState, resolveState, selectAddStatus, selectUOMConversions,
    requestAddUOM, successAddUOM, failureAddUOM
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('add UOM', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(result).toEqual(nextState)
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on add request', () => {
        const nextState = reducer(initialState, requestAddUOM())
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on add success', () => {
        const data = { id: 1, name: 'Some KG' }
        const nextState = reducer(initialState, successAddUOM(data))
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectUOMConversions(resolveState(nextState)))
            .toContain(data)
    })

    test('should update state on add failure', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureAddUOM(errors))
        expect(selectAddStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})