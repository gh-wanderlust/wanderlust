import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

const Book = (props: any) => {
  const { users } = props;
  return (
    <div>
      <ul>
        {users.map((user: any) => {
          return <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>;
        })}
      </ul>
      <Link href='/listings'>Back to listings</Link>
    </div>
  );
};

Book.getInitialProps = function(context: any) {
  return { users: context.store.getState().users };
};

export default connect()(Book);
