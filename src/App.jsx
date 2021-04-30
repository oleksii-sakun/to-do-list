import { Provider } from "react-redux";
import "./App.css";
import Board from "./components/Board";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="board_title">To-do-board</h1>
        <Board></Board>
      </div>
    </Provider>
  );
}

export default App;
