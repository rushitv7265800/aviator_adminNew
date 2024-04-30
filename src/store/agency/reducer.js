import {
  OPEN_AGENCY_DIALOG,
  CLOSE_AGENCY_DIALOG,
  GET_AGENCY,
  CREATE_NEW_AGENCY,
  EDIT_AGENCY,
  SET_CREATE_AGENCY_DONE,
  UNSET_CREATE_AGENCY_DONE,
  SET_UPDATE_AGENCY_DONE,
  UNSET_UPDATE_AGENCY_DONE,
  ENABLE_DISABLE_AGENCY,
  GET_AGENCY_DROPDOWN,
} from "./types";

const initialState = {
  agency: [],
  agencyDropdown: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const agencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENCY:
      return {
        ...state,
        agency: action.payload,
      };

    case GET_AGENCY_DROPDOWN:
      return {
        ...state,
        agencyDropdown: action.payload,
      };

    case CREATE_NEW_AGENCY:
      const data = [...state.agency];
      data.unshift(action.payload);
      return {
        ...state,
        agency: data,
      };

    case EDIT_AGENCY:
      return {
        ...state,
        agency: state.agency.map((agency) => {
          if (agency._id === action.payload.id) return action.payload.data;
          else return agency;
        }),
      };

    case SET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_AGENCY_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_AGENCY_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    case ENABLE_DISABLE_AGENCY:
      return {
        ...state,
        agency: state.agency.map((agency) => {
          if (agency._id === action.payload._id)
            return {
              ...agency,
              isDisable: action.payload.isDisable,
            };
          else return agency;
        }),
      };
    default:
      return state;
  }
};

export default agencyReducer;
