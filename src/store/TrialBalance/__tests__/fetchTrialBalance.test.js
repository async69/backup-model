import reducer, {
    initialState, resolveState, selectTrialBalances,
    trialBalanceRequest, selectFetchStatus, trialBalanceSuccess,
    trialBalanceRequestFailure
} from '../trialBalance'
import customStatus from '../../../config/customStatus'

describe('fetch trial balance', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initial state on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(result).toEqual(nextState)
        })

        test('should update state on request trial balance', () => {
            const nextState = reducer(initialState, trialBalanceRequest())
            expect(selectFetchStatus(resolveState(nextState))).toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
        })

        test('should update state on success trial balance', () => {
            const balances = [
                { id: 1, amount: 12 }
            ]
            const nextState = reducer(initialState, trialBalanceSuccess(balances))
            expect(selectFetchStatus(resolveState(nextState))).toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
            expect(selectTrialBalances(resolveState(nextState))).toEqual(balances)
        })

        test('should update state on failure trial balance', () => {
            const errors = { name: 'Error' }
            const nextState = reducer(initialState, trialBalanceRequestFailure(errors))
            expect(selectFetchStatus(resolveState(nextState))).toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
        })
    })
})