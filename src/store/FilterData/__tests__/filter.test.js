import reducer, {
    initialState, resolveState, addOption, selectOption, filter,
    selectFilteredData, _filterSelect, selectOptions
} from '../index'
import { filterTypes } from '../../../config/filterTypes'
describe('Filter tests', () => {
    test('should return initial state on first run', () => {
        const nextState = initialState
        const result = reducer(undefined, {})
        expect(result).toEqual(nextState)
    })

    test('should add filter option', () => {
        const option = {
            key: "id",
            value: "1",
            tag: "accountID",
            filterType: filterTypes.SELECT
        }
        var nextState = reducer(initialState, addOption(option))
        nextState = reducer(nextState, addOption({
            key: "name",
            value: "One",
            tag: "accountName",
            filterType: filterTypes.SELECT
        }))
        var response = selectOptions(resolveState(nextState))
        expect(response).toEqual({
            "id": {"filterType": "SELECT", "tag": "accountID", "value": "1"}, "name": {"filterType": "SELECT", "tag": "accountName", "value": "One"}
        })
    })

    test('test for _filterSelect', () => {
        const accounts = [
            { accountID: 1, accountName: 'CBE', amount: 100 },
            { accountID: 1, accountName: 'AAA', amount: 200 },
            { accountID: 2, accountName: 'BBB', amount: 300 },
        ]
        var response = _filterSelect(accounts, {
            "account": {
                tag: "accountID", value: 1, filterType: filterTypes.SELECT
            }
        })
        expect(response).toEqual([accounts[0], accounts[1]])
        var response = _filterSelect(accounts, {
            "account": {
                tag: "accountName", value: "B", filterType: filterTypes.STRING_SELECT
            }
        })
        expect(response).toEqual([accounts[2]])
    })

    test('should filter arrays based on params', () => {
        const accounts = [
            { accountID: 1, accountName: 'CBE', amount: 100 },
            { accountID: 1, accountName: 'AAA', amount: 200 },
            { accountID: 2, accountName: 'BBB', amount: 300 },
            { accountID: 3, accountName: 'CCC', amount: 300 },
        ]
        var nextState = reducer(initialState, addOption({
            key: "amount",
            value: 300,
            tag: "amount",
            filterType: filterTypes.SELECT
        }))
        nextState = reducer(nextState, filter(accounts))
        expect(selectFilteredData(resolveState(nextState)))
            .toEqual([accounts[2], accounts[3]]) 
    })

    test('tests for filterSelect for date range', () => {
        const accounts = [
            { accountID: 1, accountName: 'CBE', amount: 100, "posted_date": "2020-09-10" },
            { accountID: 1, accountName: 'AAA', amount: 200, "posted_date": "2019-09-17" },
            { accountID: 2, accountName: 'BBB', amount: 300, "posted_date": "2018-02-17" },
            { accountID: 3, accountName: 'CCC', amount: 300, "posted_date": "2020-09-25" }
        ]
        var nextState = {}
        nextState = reducer(initialState, addOption({
            key: "startDate",
            value: "2019-01-21",
            tag: "posted_date",
            filterType: filterTypes.DATE_SELECT_START
        }))
        nextState = reducer(nextState, addOption({
            key: "endDate",
            value: "2020-03-01",
            tag: "posted_date",
            filterType: filterTypes.DATE_SELECT_END
        }))
        nextState = reducer(nextState, filter(accounts))
        expect(selectFilteredData(resolveState(nextState)))
            .toEqual([accounts[1]])
    })

    test('should filter array on SELECT based on a string', () => {
        const accounts = [
            {id: 20099329.21272783, name: "magna laborum", type: "", journal_items: {}, created_at: "1971-05-06T07:58:35.356Z"},
            {id: 50592283.86911249, name: "tempor", type: "veniam officia consequat sunt tempor", journal_items: {}, created_at: "1992-10-20T09:09:54.874Z"}
        ]
        var nextState = reducer(initialState, addOption({
            key: "name",
            value: "magna laborum",
            tag: "name",
            filterType: filterTypes.SELECT
        }))
        nextState = reducer(nextState, filter(accounts))
        expect(selectFilteredData(resolveState(nextState)))
            .toEqual([accounts[0]])
        nextState = reducer(nextState, addOption({
            key: "name",
            value: "tempor",
            tag: "name",
            filterType: filterTypes.SELECT
        }))
        nextState = reducer(nextState, filter(accounts))
        expect(selectFilteredData(resolveState(nextState)))
            .toEqual([accounts[1]])
    })
})