// action types
export const ADD_ENTRY = 'ADD_ENTRY'
export const REMOVE_ENTRY = 'REMOVE_ENTRY'

// action creators
export const addEntry = newEntry => ({
  type: ADD_ENTRY,
  payload: newEntry,
})

export const removeEntry = date => ({
  type: REMOVE_ENTRY,
  payload: date,
})