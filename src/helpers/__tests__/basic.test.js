import { getQuery } from "../basic"

export const keys = [
    { value: "2020-01-01", key: "start_date" },
    { value: "2021-01-01", key: "end_date" },
]

describe('should get sth', () => {
    test('should get', () => {
        const response = getQuery(keys)
        expect(response).toEqual("?start_date=2020-01-01&end_date=2021-01-01")
    })
})