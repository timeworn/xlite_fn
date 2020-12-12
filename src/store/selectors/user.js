export const currentUser = state => state.user.currentUser;
export const selectIsLoggedIn = state => {
  return !!state.user.loginData;
};
