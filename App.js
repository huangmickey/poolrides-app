import AppEntry from "./AppEntry";
import { Provider } from "react-redux";
import { store } from "./store.js";

function App() {
  return (
    <Provider store={store} >
      <AppEntry />
    </Provider>
  )
}

export default App;