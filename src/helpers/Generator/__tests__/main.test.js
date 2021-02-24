import { generateArray } from "../index"

describe('tests for generator', () => {
    test('should generate array', () => {
        const props = {
            name: "string",
            amount: "number"
        }
        const response = generateArray(props)
        expect(response).not.toBeNull()
    })
})