import {
  GET_USER,
  BLOCK_UNBLOCK_USER,
  EDIT_USER,
  SET_UPDATE_USER_DONE,
  UNSET_UPDATE_USER_DONE,
  OPEN_USER_DIALOG,
  CLOSE_USER_DIALOG,
  EDIT_USER_COIN,
} from "./types";

const initialState = {
  user: [],
  dialog: false,
  dialogData: null,
  updateDone: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case BLOCK_UNBLOCK_USER:
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload._id)
            return {
              ...user,
              block: action.payload.block,
            };
          else return user;
        }),
      };

    case EDIT_USER:
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload.id) return action.payload.data;
          else return user;
        }),
      };
    case EDIT_USER_COIN: {
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload._id)
            return {
              ...user,
              coin: action.payload.coin,
            };
          else return user;
        }),
      };
    }
    case SET_UPDATE_USER_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_USER_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_USER_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_USER_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default userReducer;
