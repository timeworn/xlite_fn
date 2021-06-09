import { UserActionTypes } from 'store/actions/user';
const loginData = localStorage.getItem("accessToken");

const initState = {
  loginData: (loginData && JSON.parse(loginData)) || "",
  currentUser: {
    email: '',
    name: '',
    address: '',
    id: 0,
    active: 0,
    apiKey: '',
    received: true,
    emailEnable: false
  },
  services: [],
  selectedService: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENTUSER_INFO:
      return { ...state, currentUser: action.user };
    case UserActionTypes.SET_LOGIN_DATA:
      localStorage.setItem('accessToken', JSON.stringify(action.loginData));
      return { ...state, loginData: action.loginData };
    case UserActionTypes.SET_SERVICES:
      return { ...state, services: action.user}
    case UserActionTypes.SET_SELECTEDSERVICE:
      return { ...state, selectedService: action.user}
    default:
      return state;
  }
}
