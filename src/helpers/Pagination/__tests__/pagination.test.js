import { getCount } from "../index"

describe('should paginate', () => {
    test('should paginate', () => {
        const response = getCount({ data: Array(10).fill('one'), count: 38 })
        expect(response.numberOfPages).toEqual(4)
        expect(response.max_amount).toEqual(10)
    })
})