import { CHANGE_DATE_AND_TIME } from "./../types";

const initialState = {
  date: {
    dateNum: "",
    day: "",
    month: "",
    year: "",
  },
  time: {
    hour: "",
    minute: "",
    second: "",
    amPm: "",
  },
};

export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE_AND_TIME: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
