import reducer, {
    initialState, resolveState, selectEditStatus, successFetchTaxes, selectTaxes,
    requestEditTax, successEditTax, failureEditTax
} from '../tax'
import customStatus from '../../../config/customStatus'

describe('edit tax', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initialState on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(result).toEqual(nextState)
            expect(selectEditStatus(resolveState(result)))
                .toEqual({
                    loading: false,
                    status: customStatus.initial,
                    errors: null
                })
        })

        test('should update state on request edit', () => {
            const nextState = reducer(initialState, requestEditTax())
            expect(selectEditStatus(resolveState(nextState)))
                .toEqual({
                    loading: true,
                    status: customStatus.pending,
                    errors: null
                })
        })

        test('should update state on success edit', () => {
            const taxes = [{ id: 1, name: 'Default', type: 'TOT' }]

            const tax = { id: 1, name: 'Something else', type: 'VAT' }
            var nextState = reducer(initialState, successFetchTaxes(taxes))
            nextState = reducer(nextState, successEditTax(tax))
            expect(selectEditStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.success,
                    errors: null
                })
            expect(selectTaxes(resolveState(nextState)))
                .toContain(tax)
        })

        test('should update state on failure edit', () => {
            const errors = { name: 'Error' }
            const nextState = reducer(initialState, failureEditTax(errors))
            expect(selectEditStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.failed,
                    errors
                })
        })
    })
})