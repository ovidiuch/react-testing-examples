import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function UserPage({ match: { params } }) {
  return (
    <div>
      User #{params.userId} <Link to="/users/6">Next user</Link>
    </div>
  );
}

export const UserWithRouter = withRouter(UserPage);
