import React from 'react';

export const CompWithBtn = ({ onClick }) => (
  <div>
    <button onClick={onClick} />
  </div>
);

export const HelloMessage = ({ name }) => <span>Hello {name}</span>;
