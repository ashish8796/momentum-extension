import { START_POMODORO, CHANGE_POMODORO_TIME } from "./../types";

const initialState = {
  pomoMinute: "05",
  pomoStart: false,
};

export default function pomodoroReducer(state = initialState, action) {
  switch (action.type) {
    case START_POMODORO: {
      localStorage.setItem(
        "pomodoro",
        JSON.stringify({ ...state, pomoStart: action.payload })
      );

      return {
        ...state,
        pomoStart: action.payload,
      };
    }

    case CHANGE_POMODORO_TIME: {
      localStorage.setItem(
        "pomodoro",
        JSON.stringify({ ...state, pomoMinute: +action.payload })
      );
      console.log(action.payload);

      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
