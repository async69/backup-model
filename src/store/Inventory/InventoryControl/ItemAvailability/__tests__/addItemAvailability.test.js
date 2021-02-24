import reducer, {
  initialState,
  resolveState,
  selectAddStatus,
  selectAvailableItems,
  requestAdd,
  successAdd,
  failureAdd,
} from "../index";
import customStatus from "../../../../../config/customStatus";

describe("Add Item Availability", () => {
  test("should return initialState on first run", () => {
    const nextState = initialState;
    const result = reducer(undefined, {});
    expect(result).toEqual(nextState);
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.initial,
      errors: null,
    });
  });

  test("should update state on add request", () => {
    const nextState = reducer(initialState, requestAdd());
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: true,
      status: customStatus.pending,
      errors: null,
    });
  });

  test("should update state on add success", () => {
    const data = { id: 1, name: "Some KG" };
    const nextState = reducer(initialState, successAdd(data));
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.success,
      errors: null,
    });
    expect(selectAvailableItems(resolveState(nextState))).toContain(data);
  });

  test("should update state on add failure", () => {
    const errors = { name: "Error" };
    const nextState = reducer(initialState, failureAdd(errors));
    expect(selectAddStatus(resolveState(nextState))).toEqual({
      loading: false,
      status: customStatus.failed,
      errors,
    });
  });
});
