import reducer, {
  initialState,
  resolveState,
  selectFetchStatus,
  selectItemJournals,
  requestFetchItemAdjJournals,
  successFetchItemAdjJournals,
  failureFetchItemJournals,
} from "../index";
import customStatus from "../../../../../config/customStatus";

describe("fetchItemAdjJournals", () => {
  test("should return initialState on first run", () => {
    const nextState = initialState;
    const result = reducer(undefined, {});
    expect(nextState).toEqual(result);
    expect(selectFetchStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.initial,
      errors: null,
    });
  });
  test("should update state on request fetch", () => {
    const nextState = reducer(initialState, requestFetchItemAdjJournals());
    expect(selectFetchStatus(resolveState(nextState))).toEqual({
      loading: true,
      status: customStatus.pending,
      errors: null,
    });
  });
  test("should update state on succcess fetch", () => {
    const itemJournals = { results: [{ id: 1, itemName: "Some Item" }] };
    const nextState = reducer(
      initialState,
      successFetchItemAdjJournals(itemJournals)
    );
    expect(selectFetchStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.success,
      errors: null,
    });
    expect(selectItemJournals(resolveState(nextState))).toEqual(
      itemJournals.results
    );
  });

  test("should update state on failure fetch", () => {
    const errors = { name: "Error" };
    const nextState = reducer(initialState, failureFetchItemJournals(errors));
    expect(selectFetchStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.failed,
      errors,
    });
  });
});
