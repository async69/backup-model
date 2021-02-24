import reducer, {
    initialState, resolveState, selectAddStatus, selectPaymentInfo,
    requestAddPayment, successAddPayment, failureAddStatus
} from '../payment'
import customStatus from '../../../config/customStatus'

describe('add payment', () => {
    describe('reducers, actions and selectors', () => {
        test('should return initialState on first run', () => {
            const nextState = initialState
            const result = reducer(undefined, {})
            expect(result).toEqual(nextState)
            expect(selectAddStatus(resolveState(result)))
                .toEqual({
                    loading: false,
                    status: customStatus.initial,
                    errors: null
                })
        })

        test('should update state on request add', () => {
            const nextState = reducer(initialState, requestAddPayment())
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: true,
                    status: customStatus.pending,
                    errors: null
                })
        })

        test('should update state on success add', () => {
            const paymentInformation = { info: 'Added Payment' }
            const nextState = reducer(initialState, successAddPayment(paymentInformation))
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.success,
                    errors: null
                })
            expect(selectPaymentInfo(resolveState(nextState)))
                .toEqual(paymentInformation)
        })

        test('should update state on failure add', () => {
            const errors = { name: 'Error' }
            const nextState = reducer(initialState, failureAddStatus(errors))
            expect(selectAddStatus(resolveState(nextState)))
                .toEqual({
                    loading: false,
                    status: customStatus.failed,
                    errors
                })
        })
    })
})