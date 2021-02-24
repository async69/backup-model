import reducer, {
    initialState, resolveState, successFetch, selectPurhcaseReturns, selectUpdateStatus,
    requestUpdateStatus, successUpdateStatus, failureUpdateStatus,
} from "../index"
import customStatus from "../../../../config/customStatus"

describe('change status', () => {
    test('should update status on request update', () => {
        const nextState = reducer(initialState, requestUpdateStatus())
        expect(selectUpdateStatus(resolveState(nextState)))
            .toEqual({
                loading: true,
                status: customStatus.pending,
                errors: null
            })
    })

    test('should change status on success update', () => {
        const data = [{ id: 1, name: 'one', status: 'Created' }]
        const payload = { results: data }
        var nextState = reducer(initialState, successFetch(payload))
        nextState = reducer(nextState, successUpdateStatus({
            data: data[0], tag: 'status', value: 'Approved'
        }))
        expect(selectPurhcaseReturns(resolveState(nextState)))
            .toEqual([
                { id: 1, name: 'one', status: 'Approved' }
            ])
    })

    test('should update state on failure update', () => {
        const errors = { name: 'Error' }
        const nextState = reducer(initialState, failureUpdateStatus(errors))
        expect(selectUpdateStatus(resolveState(nextState)))
            .toEqual({
                loading: false,
                status: customStatus.failed,
                errors
            })
    })
})