export const UserActionTypes = {
  SET_CURRENTUSER_INFO: 'SET_CURRENTUSER_INFO',
  SET_LOGIN_DATA: 'SET_LOGIN_DATA',
  SET_SERVICES: 'SET_SERVICES',
  SET_SELECTEDSERVICE: 'SET_SELECTEDSERVICE'
};

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENTUSER_INFO,
  user
});

export const ActionSetLoginData = (loginData) => ({
  type: UserActionTypes.SET_LOGIN_DATA,
  loginData
});

export const ActionSetServices = (user) => ({
  type: UserActionTypes.SET_SERVICES,
  user
});

export const ActionSetSelectedService = (user) => ({
  type: UserActionTypes.SET_SELECTEDSERVICE,
  user
});
