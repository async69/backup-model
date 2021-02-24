import reducer, {
    initialState, resolveState, selectFetchStatus, selectLedgers,
    requestFetchLedgers, successFetchLedgers, failureFetchLedgers
} from '../generalLedger'
import customStatus from '../../../config/customStatus'

describe('general ledger', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initialState on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(result).toEqual(nextState)
            expect(selectFetchStatus(resolveState(result)))
                .toEqual({
                    loading: false,
                    status: customStatus.initial,
                    errors: null
                })
        })

        test('should update state on request fetch', () => {
            const nextState = reducer(initialState, requestFetchLedgers())
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: true,
                    status: customStatus.pending,
                    errors: null
                })
        })

        test('should update state on success fetch', () => {
            const ledgers = [{ name: 'John', value: 10 }]
            const nextState = reducer(initialState, successFetchLedgers(ledgers))
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.success,
                    errors: null
                })
            expect(selectLedgers(resolveState(nextState)))
                .toEqual(ledgers)
        })

        test('should update state on failure fetch', () => {
            const errors = { name: 'Error' }
            const nextState = reducer(initialState, failureFetchLedgers(errors))
            expect(selectFetchStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.failed,
                    errors
                })
        })
    })
})