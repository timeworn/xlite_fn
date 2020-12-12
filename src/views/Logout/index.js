import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { AuthService } from '../../core/services/auth.service';
import { ActionSetLoginData } from '../../store/actions/user';
import { useDispatch } from 'react-redux';
import history from '../../core/history/history';

export default function LogoutView() {
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.instance.logout();
    dispatch(ActionSetLoginData(null));
    history.push('/');
  }, []);
  return (
    <Box>logout</Box>
  );
}
