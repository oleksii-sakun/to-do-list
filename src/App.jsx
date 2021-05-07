import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Board from "./components/Board";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Board></Board>
        <ToastContainer></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
