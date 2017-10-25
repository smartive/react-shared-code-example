import React from 'react';

export const List = ({
  people, total, loaded, onClick,
}) => (
  <div>
    <ul>
      {people.map(person => <li key={`person-${person.id}`}>{person.name}</li>)}

      {loaded === total ? null : <button onClick={onClick}>More</button>}
    </ul>
  </div>
);
