class Configuration {
  DEVICE_COLLECTION_URL = `${process.env.REACT_APP_API_URL}/devices`;
  AUTH_URL = `${process.env.REACT_APP_API_URL}/auth`;
  CHANGE_PASSWORD__URL = `${process.env.REACT_APP_API_URL}/auth/change-password`;
  LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
  REGISTER_URL = `${process.env.REACT_APP_API_URL}/auth/register`;
  PROFILE_URL = `${process.env.REACT_APP_API_URL}/auth/profile`;
  OVERVIEW_URL = `${process.env.REACT_APP_API_URL}/dashboard/overview`;
  EVENTS_URL = `${process.env.REACT_APP_API_URL}/dashboard/events`;
  GROUPS_URL = `${process.env.REACT_APP_API_URL}/groups`;
  CREATE_GROUP_URL = `${process.env.REACT_APP_API_URL}/groups/create`;
  SCHEDULES_URL = `${process.env.REACT_APP_API_URL}/schedules`;
  SERVICES_URL = `${process.env.REACT_APP_API_URL}/users`;
  ORGANIZATIONS_URL = `${process.env.REACT_APP_API_URL}/organizations`;
  USERGROUPS_URL = `${process.env.REACT_APP_API_URL}/user-groups`;
  static instance = new Configuration();
}

export default Configuration;
