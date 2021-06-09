export const currentUser = state => state.user.currentUser;
export const selectIsLoggedIn = state => {
  return !!state.user.loginData;
};

export const selectServices = state => state.user.services;
export const selectService = state => state.user.selectedService;

