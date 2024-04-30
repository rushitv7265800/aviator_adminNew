import {
  OPEN_BANNER_DIALOG,
  CLOSE_BANNER_DIALOG,
  GET_BANNER,
  CREATE_NEW_BANNER,
  EDIT_BANNER,
  DELETE_BANNER,
  SET_CREATE_BANNER_DONE,
  UNSET_CREATE_BANNER_DONE,
  SET_UPDATE_BANNER_DONE,
  UNSET_UPDATE_BANNER_DONE,
} from "./types";

const initialState = {
  banner: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };
    case CREATE_NEW_BANNER:
      const data = [...state.banner];
      data.unshift(action.payload);
      return {
        ...state,
        banner: data,
      };
    case EDIT_BANNER:
      return {
        ...state,
        banner: state.banner.map((banner) => {
          if (banner._id === action.payload.id) return action.payload.data;
          else return banner;
        }),
      };
    case DELETE_BANNER:
      return {
        ...state,
        banner: state.banner.filter((banner) => banner._id !== action.payload),
      };

    case SET_CREATE_BANNER_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_BANNER_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_BANNER_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_BANNER_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_BANNER_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_BANNER_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default bannerReducer;
