import {
  GET_SETTING,
  EDIT_SETTING,
  GOOGLE_SWITCH,
  STRIPE_SWITCH,
  RAZOR_PAY_SWITCH,
  FAKE_DATA_SWITCH
} from "./types";

const initialState = {
  setting: {},
  updateDone: false,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTING:
      return {
        ...state,
        setting: action.payload,
      };

    case EDIT_SETTING:
      return {
        ...state,
        setting: state.setting.map((setting) => {
          if (setting._id === action.payload.id) return action.payload.data;
          else return setting;
        }),
      };

    case GOOGLE_SWITCH:
      return {
        ...state,
        setting: {
          ...state.setting,
          googlePaySwitch: action.payload.googlePaySwitch,
        },
      };
    case RAZOR_PAY_SWITCH:
      return {
        ...state,
        setting: {
          ...state.setting,
          razorPaySwitch: action.payload.razorPaySwitch,
        },
      };
    case STRIPE_SWITCH:
      
      return {
        ...state,
        setting: {
          ...state.setting,
          stripeSwitch: action.payload.stripeSwitch,

        },
      };
      
      case FAKE_DATA_SWITCH:
        return {
          ...state,
          setting: {
            ...state.setting,
            isFakeData: action.payload.isFakeData,
          },
        };

    default:
      return state;
  }
};

export default settingReducer;
