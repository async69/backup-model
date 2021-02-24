import reducer, {
  initialState,
  resolveState,
  selectAddStatus,
  selectItemJournals,
  requestAddItemAdjJournal,
  successAddItemAdjJournal,
  failureAddJournals,
} from "../index";
import customStatus from "../../../../../config/customStatus";

describe("addItemAdjJournals", () => {
  test("should return initialState on first run", () => {
    const nextState = initialState;
    const result = reducer(undefined, {});
    expect(result).toEqual(nextState);
    expect(selectAddStatus(resolveState(result))).toEqual({
      loading: false,
      status: customStatus.initial,
      errors: null,
    });
  });

  test("should update state on add request", () => {
    const nextState = reducer(initialState, requestAddItemAdjJournal());
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: true,
      status: customStatus.pending,
      errors: null,
    });
  });

  test("should update state on add success", () => {
    const data = { id: 1, name: "Sth" };
    const nextState = reducer(initialState, successAddItemAdjJournal(data));
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.success,
      errors: null,
    });
    expect(selectItemJournals(resolveState(nextState))).toContain(data);
  });

  test("should update state on failure add", () => {
    const errors = { name: "Error" };
    const nextState = reducer(initialState, failureAddJournals(errors));
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.failed,
      errors,
    });
  });
});
