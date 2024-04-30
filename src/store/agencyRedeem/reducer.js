import {
  GET_ACCEPTED_REDEEM,
  GET_PENDING_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  DELETE_REDEEM,
  DECLINE_REDEEM,
  OPEN_REDEEM_ACCEPT_DIALOG,
  CLOSE_REDEEM_ACCEPT_DIALOG,
  ACCEPT_SUCCESS,
  CLOSE_ACCEPT_SUCCESS,
} from "./types";

const initialState = {
  agencyAccepted: [],
  agencyPending: [],
  dialog: false,
  dialogData: null,
  acceptDone: false,
};

const agencyRedeemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_REDEEM:
      return {
        ...state,
        agencyAccepted: action.payload,
      };
    case GET_PENDING_REDEEM:
      return {
        ...state,
        agencyPending: action.payload,
      };
    case ACCEPT_REDEEM_REQUEST:
      return {
        ...state,
        agencyPending: state.agencyPending.filter(
          (redeem) => redeem._id !== action.payload._id
        ),
      };

    case DELETE_REDEEM:
      return {
        ...state,
        agencyRedeem: state.agencyRedeem.filter(
          (data) => data._id !== action.payload
        ),
      };

    case DECLINE_REDEEM:
      return {
        ...state,
        pendingRedeem: state.pendingRedeem.map((data) => {
          if (data._id === action.payload.id) return action.payload.data;
          else return data;
        }),
      };

    case OPEN_REDEEM_ACCEPT_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_REDEEM_ACCEPT_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case ACCEPT_SUCCESS:
      return {
        ...state,
        acceptDone: true,
      };

    case CLOSE_ACCEPT_SUCCESS:
      return {
        ...state,
        acceptDone: false,
      };

    default:
      return state;
  }
};

export default agencyRedeemReducer;
