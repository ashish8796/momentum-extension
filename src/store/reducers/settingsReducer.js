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
          ...state.settings,
          links: { ...action.payload },
        })
      );
      return {
        ...state,
        settings: {
          ...state.settings,
          links: { ...action.payload },
        },
      };
    }

    case CHANGE_FORMAT: {
      localStorage.setItem(
        "settings",
        JSON.stringify({ ...state.settings, format: action.payload })
      );
      return {
        ...state,
        settings: { ...state.settings, format: action.payload },
      };
    }

    default:
      return state;
  }
}
