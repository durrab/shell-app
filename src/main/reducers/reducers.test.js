import { describe, expect, it } from '@jest/globals';
import { actionTypes, reduxReducers } from './index';

// Starting by testing reducers, since that's where the core logic is for Redux setup.
describe('subappMain reducer', () => {
  // using the same initValue for multiple test cases is OK, since we never modify it -- we make immutable copies.
  const initValue = {
    isLeftDrawerVisible: false,
    isRightDrawerVisible: false,
    subappsInPreview: {},
  };

  it('should return the initial state', () => {
    expect(reduxReducers.subappMain(undefined, {})).toEqual(initValue)
  })

  it('reducer should not return a mutated state', () => {
    const testObject = {a: "b"};
    const mutateObject = (testObject) => {
      testObject.a = 'c';
      return testObject;
    }
    // mutated object is still the same object:
    expect(testObject === mutateObject(testObject)).toBe(true);

    // our reducer do not mutate state.
    expect(
      reduxReducers.subappMain(initValue, {
        type: actionTypes.SET_IS_LEFT_DRAWER_VISIBLE,
        payload: true
      }) === initValue
    ).toBe(false);
  })

  it('should handle ' + actionTypes.SET_IS_LEFT_DRAWER_VISIBLE, () => {
    expect(
      reduxReducers.subappMain(initValue, {
        type: actionTypes.SET_IS_LEFT_DRAWER_VISIBLE,
        payload: true
      })
    ).toEqual(
      {
        isLeftDrawerVisible: true,
        isRightDrawerVisible: false,
        subappsInPreview: {},
      }
    )
  })

  it('should handle ' + actionTypes.SET_IS_RIGHT_DRAWER_VISIBLE, () => {
    expect(
      reduxReducers.subappMain(initValue, {
        type: actionTypes.SET_IS_RIGHT_DRAWER_VISIBLE,
        payload: true
      })
    ).toEqual(
      {
        isLeftDrawerVisible: false,
        isRightDrawerVisible: true,
        subappsInPreview: {},
      }
    )
  })

  it('should handle ' + actionTypes.SET_SUBAPP_IN_PREVIEW, () => {
    expect(
      reduxReducers.subappMain(initValue, {
        type: actionTypes.SET_SUBAPP_IN_PREVIEW,
        pathname: 'cloudrdbms',
        name: 'Cloud RDBMS',
        version: '0.0.4'
      })
    ).toEqual(
      {
        ...initValue,
        subappsInPreview: {
          cloudrdbms: {
            name: 'Cloud RDBMS',
            version: '0.0.4'
          }
        },
      }
    )
  })

  it('should handle ' + actionTypes.TOGGLE_IS_LEFT_DRAWER_VISIBLE, () => {
    expect(
      reduxReducers.subappMain({
        isLeftDrawerVisible: true,
        isRightDrawerVisible: false
      }, {
        type: actionTypes.TOGGLE_IS_LEFT_DRAWER_VISIBLE
      })
    ).toEqual(
      {
        isLeftDrawerVisible: false,
        isRightDrawerVisible: false
      }
    );

    expect(
      reduxReducers.subappMain({
        isLeftDrawerVisible: false,
        isRightDrawerVisible: false
      }, {
        type: actionTypes.TOGGLE_IS_LEFT_DRAWER_VISIBLE
      })
    ).toEqual(
      {
        isLeftDrawerVisible: true,
        isRightDrawerVisible: false
      }
    );
  })
})
