export const GroupActionTypes = {
  SET_SELECTEDGROUP_INFO: 'SET_SELECTEDGROUP_INFO',
  SET_ALL_GROUP: 'SET_ALL_GROUP'
};


export const setSelectedGroup = (group) => ({
  type: GroupActionTypes.SET_SELECTEDGROUP_INFO,
  group
});

export const setAllGroup = (groups) => ({
  type: GroupActionTypes.SET_ALL_GROUP,
  groups
});


