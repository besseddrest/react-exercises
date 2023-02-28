import { Routes, Route, Outlet, Link } from "react-router-dom"; 
import Counter from './components/Counter/Counter';
import RandomUser from './components/RandomUser/RandomUser';
import RandomUserInt from './components/RandomUserInt/RandomUserInt';
import Board from './components/Wordle/Board';
import './App.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <aside>
        <h3>Exercises</h3>
        <ul className="menu">
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/random-user">Random User</Link></li>
          <li><Link to="/random-user-int">Random User (Intermediate)</Link></li>
          <li><Link to="/wordle">Wordle</Link></li>
        </ul>
      </aside>
      <main>
        <Routes>  
          <Route path="/">
            <Route path="/counter" element={<Counter />}></Route>
            <Route path="/random-user" element={<RandomUser />}></Route>
            <Route path="/random-user-int" element={<RandomUserInt />}></Route>
            <Route path="/wordle" element={<Board />}></Route>
          </Route>
        </Routes>
      </main>

    </div>
  );
}

export default App;
