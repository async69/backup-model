import reducer, {
    initialState, selectFetchStatus, resolveState, selectTaxes,
    requestFetchTaxes, successFetchTaxes, failureFetchTaxes
} from '../tax'
import customStatus from '../../../config/customStatus'

describe('fetch taxes', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initial state on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(nextState).toEqual(result)
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.initial,
                    errors: null
                })
        })

        test('should update state on request fetch', () => {
            const nextState = reducer(initialState, requestFetchTaxes())
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: true,
                    status: customStatus.pending,
                    errors: null
                })
        })

        test('should update state on success fetch', () => {
            const taxes = [ { type: 'VAT' } ]
            const nextState = reducer(initialState, successFetchTaxes(taxes))
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.success,
                    errors: null
                })
            expect(selectTaxes(resolveState(nextState)))
                .toEqual(taxes)
        })

        test('should update state on success error', () => {
            const errors = { name: 'Error' }
            const nextState = reducer(initialState, failureFetchTaxes(errors))
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.failed,
                    errors
                })
        })
    })
})