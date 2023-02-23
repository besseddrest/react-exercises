import { useEffect, useState } from "react";
import Card from './Card';
import './random-user.scss';

const RandomUser = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(res => setUsers(users.concat(res.results[0])))
    } catch (e) {
      console.error(e);
    }
  }

  const handleGetNextUser = () => fetchData();

  return (
    <>
      <h1>Random User Exercise</h1>
      <button onClick={handleGetNextUser}>Get Next User</button>
      <div className="user-cards">
        {
          users.map((user, i) => 
            <Card user={user} key={i} />
          )
        }
      </div>
    </>
  )
}

export default RandomUser;