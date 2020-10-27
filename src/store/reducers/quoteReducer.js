import { TOGGLE_QUOTE, GET_QUOTES } from "./../types";

const initialState = {
  quoteUri: "http://quotes.rest/qod.json?category=inspire",
  quote: "",
  showQuote: localStorage.hasOwnProperty("showQuote")
    ? JSON.parse(localStorage.getItem("showQuote"))
    : true,
};

export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_QUOTE: {
      localStorage.setItem("showQuote", JSON.stringify(action.payload));

      return {
        ...state,
        quoteState: { ...state.quoteState, showQuote: action.payload },
      };
    }
    case GET_QUOTES: {
      //   console.log(action.payload);
      return {
        ...state,
        quoteState: { ...state.quoteState, quote: action.payload },
      };
    }

    default:
      return state;
  }
}
