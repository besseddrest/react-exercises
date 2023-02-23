const Card = ({ user }, i) => {
  return (
    <div className="user-card" key={i}>
      <img src={ user.picture.large } alt="This User's Photo" />
      <h2>{ user.name.first } { user.name.last }</h2>
      <ul className="user-card__info">
        <li><strong>Gender:</strong> { user.gender }</li>
        <li><strong>Email:</strong> { user.email }</li>
      </ul>
    </div>
  );
}

export default Card;