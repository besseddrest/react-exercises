import { Routes, Route, Outlet, Link } from "react-router-dom"; 
import Counter from './components/Counter/Counter';
import RandomUser from './components/RandomUser/RandomUser';
import RandomUserInt from './components/RandomUserInt/RandomUserInt';
import './App.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ul className="menu">
        <li><Link to="/counter">Counter Exercise</Link></li>
        <li><Link to="/random-user">Random User Exercise</Link></li>
        <li><Link to="/random-user-int">Random User (Intermediate)</Link></li>
      </ul>
      <Routes>
        <Route path="/">
          <Route path="/counter" element={<Counter />}></Route>
          <Route path="/random-user" element={<RandomUser />}></Route>
          <Route path="/random-user-int" element={<RandomUserInt />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
