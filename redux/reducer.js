import { ADD_ENTRY, UPDATE_ENTRY, REMOVE_ENTRY } from "./actions";

const merge = (prev, next) => Object.assign({}, prev, next);

const remove = (prev, keyToRemove) => {
  const { [keyToRemove]: value, ...next } = prev;
  return next;
};

const entryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return merge(state, action.payload);
    case UPDATE_ENTRY:
      return merge(state, action.payload);
    case REMOVE_ENTRY:
      return remove(state, { token: action.payload });
    default:
      return state;
  }
};

export default entryReducer;
