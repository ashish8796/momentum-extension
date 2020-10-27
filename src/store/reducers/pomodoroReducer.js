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
        JSON.stringify({ ...state.pomodoro, pomoStart: action.payload })
      );

      return {
        ...state,
        pomodoro: { ...state.pomodoro, pomoStart: action.payload },
      };
    }

    case CHANGE_POMODORO_TIME: {
      localStorage.setItem(
        "pomodoro",
        JSON.stringify({ ...state.pomodoro, ...action.payload })
      );

      return { ...state, pomodoro: { ...state.pomodoro, ...action.payload } };
    }

    default:
      return state;
  }
}
