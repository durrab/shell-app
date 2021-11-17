import set from 'immutable-set';

// High level design:
// compartment each sub-app related state into one top level Redux entry.
// Use subapp<Subapp_Name> as the root entry key.

// 1. Define all the Redux sub-keys for a given subapp.
export const actionTypes = {
  SET_IS_LEFT_DRAWER_VISIBLE: 'SET_IS_LEFT_DRAWER_VISIBLE',
  SET_IS_RIGHT_DRAWER_VISIBLE: 'SET_IS_RIGHT_DRAWER_VISIBLE',
  SET_SUBAPP_IN_PREVIEW: 'SET_SUBAPP_IN_PREVIEW',
  TOGGLE_IS_LEFT_DRAWER_VISIBLE: 'TOGGLE_IS_LEFT_DRAWER_VISIBLE'
}

// 2. Configure the initial value.
const initValue = {
  isLeftDrawerVisible: false,
  isRightDrawerVisible: false,
  subappsInPreview: {}
};

// 3. The reducer -- core of Redux logic.
const reducer = (subappMain = initValue, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_LEFT_DRAWER_VISIBLE:
      return set(subappMain, 'isLeftDrawerVisible', action.payload);
    case actionTypes.SET_IS_RIGHT_DRAWER_VISIBLE:
      return set(subappMain, 'isRightDrawerVisible', action.payload);
    case actionTypes.SET_SUBAPP_IN_PREVIEW: {
      const { pathname, name, version } = action;
      const subappsInPreview = {...subappMain.subappsInPreview};
      subappsInPreview[pathname] = { name, version };

      return set(subappMain, 'subappsInPreview', subappsInPreview);
    }
    case actionTypes.TOGGLE_IS_LEFT_DRAWER_VISIBLE:
      const newIsLeftDrawerVisible = !subappMain.isLeftDrawerVisible;
      return set(subappMain, 'isLeftDrawerVisible', newIsLeftDrawerVisible);
    default:
      return subappMain
  }
}

// 4. Helper functions, to make usages easier and cleaner.
// Helper get function.
// example usage:
// `const isLeftDrawerVisible = useSelector(subappMain.get('isLeftDrawerVisible'));`
const get = stateId => ({ "subappMain": subappMainState }) =>
  subappMainState[stateId];

// Helper set function.
const setIsLeftDrawerVisible = (isLeftDrawerVisible) => {
  return {
    type: actionTypes.SET_IS_LEFT_DRAWER_VISIBLE,
    payload: isLeftDrawerVisible
  }
};

const setIsRightDrawerVisible = (isRightDrawerVisible) => {
  return {
    type: actionTypes.SET_IS_RIGHT_DRAWER_VISIBLE,
    payload: isRightDrawerVisible
  }
};

const setSubappInPreview = (pathname, name, version) => {
  return {
    type: actionTypes.SET_SUBAPP_IN_PREVIEW,
    pathname, name, version
  };
}

const toggleIsLeftDrawerVisible = () => {
  return {
    type: actionTypes.TOGGLE_IS_LEFT_DRAWER_VISIBLE
  }
};

export const subappMain = {
  setIsLeftDrawerVisible,
  setIsRightDrawerVisible,
  setSubappInPreview,
  toggleIsLeftDrawerVisible,
  get
}

// All Redux state for a particular subapp and that subapp only lives in a single Redux root entry.
export const reduxReducers = {
  subappMain: reducer
}