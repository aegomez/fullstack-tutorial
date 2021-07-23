import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/client';

import { menuItemClassName } from '../components/menu-item';
import { isLoggedInVar } from '../cache';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});

const LogoutButton: React.FC<any> = () => {
  const client = useApolloClient();

  function handleClick() {
    // Evict and garbage-collect the cached user object
    client.cache.evict({ fieldName: 'me' });
    client.cache.gc();
    // Remove user details from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Set the loggedIn status to false
    isLoggedInVar(false);
  }

  return (
    <StyledButton data-testid="logout-button" onClick={handleClick}>
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;
