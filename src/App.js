import React from "react";
import { Provider } from "react-redux";
import Background from "./components/Background";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Background />
    </Provider>
  );
}

export default App;
