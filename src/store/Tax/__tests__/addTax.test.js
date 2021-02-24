import reducer, {
    initialState, selectAddStatus, resolveState, selectTaxes,
    requestAddTax, successAddTax, failureAddTax
} from '../tax'
import customStatus from '../../../config/customStatus'

describe('add tax', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initial state on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(nextState).toEqual(result)
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.initial,
                    errors: null
                })
        })

        test('should update state on request add', () => {
            const nextState = reducer(initialState, requestAddTax())
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: true,
                    status: customStatus.pending,
                    errors: null
                })
        })

        test('should update state on success add', () => {
            const tax = { type: 'VAT' }
            const nextState = reducer(initialState, successAddTax(tax))
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.success,
                    errors: null
                })
            expect(selectTaxes(resolveState(nextState)))
                .toContain(tax)
        })

        test('should update state on failure add', () => {
            const errors = { name: 'Errors' }
            const nextState = reducer(initialState, failureAddTax(errors))
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.failed,
                    errors
                })
        })
    })
})