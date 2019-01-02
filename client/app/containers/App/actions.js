/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import action from "utils/action";
import * as types from "./constants";

/**
 * sets a dialog
 *
 * @param  {object} dialog The dialog
 *
 * @return {object}       An action object with a type of SET_DIALOG passing the dialog
 */
export const setDialog = action(types.SET_DIALOG, "dialog");

/**
 * sets the user
 *
 * @param  {object} user The userInfo
 *
 * @return {object}       An action object with a type of SET_USER passing the user
 */
export const setUser = action(types.SET_USER, "user");

/**
 * sets the token
 *
 * @param  {string} user The Authentication token
 *
 * @return {object}       An action object with a type of SET_TOKEN passing the token
 */
export const setToken = action(types.SET_TOKEN, "token");

/**
 * adds a message to the messages stack
 *
 * @param  {object} payload Object defining type and text of message
 *
 * @return {object}       An action object with a type of ADD_MESSAGE passing the payload
 */
export const addMessage = action(types.ADD_MESSAGE, "payload");

/**
 * sets the token
 *
 * @param  {number} payload The index of message to be deleted
 *
 * @return {object}       An action object with a type of DELETE_MESSAGE passing the index
 */
export const deleteMessage = action(types.DELETE_MESSAGE, "payload");

/**
 * logs out user clears token in localstorage and resets app redux stores
 *
 * @return {object}       An action object with a type of SET_TOKEN passing the token
 */
export const logout = action(types.LOGOUT);

//Notification Action
export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload
});

export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload
});

export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload
});
