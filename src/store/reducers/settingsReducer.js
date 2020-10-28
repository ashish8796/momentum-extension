import { ADD_LINK_TO_FOOTER, CHANGE_FORMAT } from "./../types";

const initialState = {
  ...(localStorage.hasOwnProperty("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : {
        links: {
          facebook: "",
          twitter: "",
          linkedin: "",
          github: "",
        },
        format: false,
      }),
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LINK_TO_FOOTER: {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          ...state,
          links: { ...state.links, ...action.payload },
        })
      );
      return {
        ...state,
        links: { ...state.links, ...action.payload },
      };
    }

    case CHANGE_FORMAT: {
      //   console.log(state);
      localStorage.setItem(
        "settings",
        JSON.stringify({ links: state.links, format: action.payload })
      );
      console.log(action.payload);

      return {
        ...state,
        format: action.payload,
      };
    }

    default:
      return state;
  }
}
