import reducer, {
    initialState, resolveState, selectPrintData, addPrintData
} from '../index'

describe('should add print data', () => {
    test('should return initialState on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(result).toEqual(nextState)
    })

    test('should add print data', () => {
        const data = [{ name: 'John' }]
        const nextState = reducer(initialState, addPrintData(data))
        expect(selectPrintData(resolveState(nextState)))
            .toEqual(data)
    })
})