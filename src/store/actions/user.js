export const UserActionTypes = {
  SET_CURRENTUSER_INFO: 'SET_CURRENTUSER_INFO',
  SET_LOGIN_DATA: 'SET_LOGIN_DATA'
};

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENTUSER_INFO,
  user
});

export const ActionSetLoginData = (loginData) => ({
  type: UserActionTypes.SET_LOGIN_DATA,
  loginData,
});
