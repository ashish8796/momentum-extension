import { SET_WALLPAPER } from "./../types";

const initialState = {
  url: "",
};

export default function wallpaperReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WALLPAPER: {
      //   console.log(action.payload);
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}
