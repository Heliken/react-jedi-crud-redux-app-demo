export const SET_STARSHIPS = 'SET_STARSHIPS'
export const DELETE_STARSHIP = 'DELETE_STARSHIP'
export const EDIT_STARSHIP = 'EDIT_STARSHIPS'
export const ADD_STARSHIP = 'ADD_STARSHIPS'
export const CHANGE_BELOVED_STATUS = 'CHANGE_BELOVED_STATUS'

export function setStarships(starships) {
  return { type: SET_STARSHIPS, starships };
}

export function deleteStarship(id) {
  return { type: DELETE_STARSHIP, id };
}

export function changeBelovedStatus(id) {
  return { type: CHANGE_BELOVED_STATUS, id};
}

export function editStarship(data) {
  return { type: EDIT_STARSHIP, data};
}
export function addStarship(data) {
  return { type: ADD_STARSHIP, data};
}