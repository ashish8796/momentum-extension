import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Background from "./components/Background";

function App() {
  return (
    <Provider store={store}>
      <Background />
    </Provider>
  );
}

export default App;
