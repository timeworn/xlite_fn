import { GroupActionTypes } from 'store/actions/group';

const initState = {
  selectedGroup: {
    id: 0,
    name: '',
    note: ''
  },
  allGroup: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case GroupActionTypes.SET_SELECTEDGROUP_INFO:
      return { ...state, selectedGroup: action.group };
    case GroupActionTypes.SET_ALL_GROUP:
      return { ...state, allGroup: action.groups };
    default:
      return state;
  }
}
