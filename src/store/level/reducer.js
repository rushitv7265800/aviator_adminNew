import { SET_CREATE_CATEGORY_DONE } from "../category/types";
import {
  GET_LEVEL,
  CREATE_NEW_LEVEL,
  SET_CREATE_LEVEL_DONE,
  UNSET_CREATE_LEVEL_DONE,
  EDIT_LEVEL,
  SET_EDIT_LEVEL_DONE,
  UNSET_EDIT_LEVEL_DONE,
  OPEN_LEVEL_DIALOG,
  CLOSE_LEVEL_DIALOG,
  DELETE_LEVEL,
} from "./types";

const initialState = {
  level: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const levelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };

    case CREATE_NEW_LEVEL:
      const data = [...state.level];
      data.unshift(action.payload);
      return {
        ...state,
        level: data,
      };

    case EDIT_LEVEL:
      return {
        ...state,
        level: state.level.map((level) => {
          if (level._id === action.payload.id) return action.payload.data;
          else return level;
        }),
      };

    case DELETE_LEVEL:
      return {
        ...state,
        level: state.level.filter((level) => level._id !== action.payload),
      };

    case SET_CREATE_LEVEL_DONE:
      return {
        ...state,
        createDone: true,
      };

    case UNSET_CREATE_LEVEL_DONE:
      return {
        ...state,
        createDone: false,
      };

    case OPEN_LEVEL_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_LEVEL_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case SET_EDIT_LEVEL_DONE:
      return {
        ...state,
        updateDone: true,
      };

    case UNSET_EDIT_LEVEL_DONE:
      return {
        ...state,
        updateDone: false,
      };

    default:
      return state;
  }
};

export default levelReducer;
