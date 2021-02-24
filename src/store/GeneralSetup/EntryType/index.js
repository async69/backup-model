import StateArrayModel from "../../../wrappers/StateModels/StateArrayModel";

const url = "/cities";
const NewEntryTypes = new StateArrayModel({ stateName: "new_entry_types" });

NewEntryTypes.createSlice();
NewEntryTypes.setURL(url);

export const { reducer, stateName } = NewEntryTypes.getEntity();

export const { Add, Fetch, Edit, Remove } = NewEntryTypes.getAPIHandles();

NewEntryTypes.enableCustomAct((dispatch, action) => {
  const { onSuccess } = action.payload;
  dispatch({
    ...action.payload,
    type: onSuccess,
    payload: {
      results: [{ id: 1, name: "meter" }],
    },
  });
});

export const {
  selectAddStatus,
  selectFetchStatus,
  selectEditStatus,
  selectDeleteStatus,
  selectData,
} = NewEntryTypes.getSelectors();

export { selectData as selectEntryTypes };

export default reducer;
