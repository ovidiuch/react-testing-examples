import React from 'react';

export function CompWithBtn({ onClick }) {
  return (
    <div>
      <button onClick={onClick} />
    </div>
  );
}
