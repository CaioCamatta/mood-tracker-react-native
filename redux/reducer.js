import { ADD_ENTRY, REMOVE_ENTRY } from "./actions";

const merge = (prev, next) => Object.assign({}, prev, next);

const entryReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return merge(state, {
        entries: state.entries
          .filter((entry) => entry.date !== action.payload.date)
          .concat([action.payload]),
      });
    case REMOVE_ENTRY:
      return merge(state, {
        entries: state.entries
          .filter((entry) => entry.date !== action.payload)
      });
    default:
      return state;
  }
};

export default entryReducer;
