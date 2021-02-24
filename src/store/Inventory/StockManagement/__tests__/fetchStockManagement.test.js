import reducer, {
    initialState, selectFetchStatus, resolveState, selectStocks,
    requestFetchStockManagement, successFetchStockManagement, failureFetchStockManagement
} from '../index'
import customStatus from '../../../../config/customStatus'

describe('fetchStockManagement', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(result).toEqual(nextState)
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.initial,
                errors: null
            })
    })

    test('should update state on request fetch', () => {
        const nextState = reducer(initialState, requestFetchStockManagement())
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should update state on success fetch', () => {
        const stocks = [{ id: 'some_id', posting_date: "2020-20-20" }]
        const nextState = reducer(initialState, successFetchStockManagement(stocks))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.success,
                errors: null
            })
        expect(selectStocks(resolveState(nextState)))
            .toEqual(stocks)
    })

    test('should update state on failure fetch', () => {
        const errors = { name: 'Error'}
        const nextState = reducer(initialState, failureFetchStockManagement(errors))
        expect(selectFetchStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})