import * as ActionType from "./types"

const initialState = {
  fakeHost: [],
  total: null,
  dialog: false,
  dialogData: null,
  analytic: [],
  totalCoin: {},
  createDone: false,
  updateDone: false,
};


const fakeHostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ALL_FAKE_HOST:
      return {
        ...state,
        fakeHost: action.payload.data,
        total: action.payload.total
      }

    case ActionType.CREATE_NEW_FAKE_HOST:
      
      const data = [...state.fakeHost];
      data.unshift(action.payload);
      return {
        ...state,
        fakeHost: data,
      };

      case ActionType.EDIT_FAKE_HOST:
        
        return {
          ...state,
          fakeHost: state.fakeHost.map((fakeHost) => {
            if (fakeHost._id === action.payload.id) return action.payload.data;
            else return fakeHost;
          }),
        };

    case ActionType.OPEN_FAKE_HOST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case ActionType.CLOSE_FAKE_HOST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case ActionType.SET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case ActionType.UNSET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case ActionType.SET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case ActionType.UNSET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: false,
      };

      case ActionType.IS_ONLINE_FAKE_HOST:
        
        return {
          ...state,
          fakeHost: {
            ...state,
            isLive: action.payload.isLive,
          },
        };

    default:
      return state;
  }
}

export default fakeHostReducer;