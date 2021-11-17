const SET_IS_PROJECT_LOADING = 'SET_IS_PROJECT_LOADING';
const SET_IS_PROJECT_MODAL_VISIBLE = 'SET_IS_PROJECT_MODAL_VISIBLE';
const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

const isProjectLoading = (isProjectLoading = false, action) => {
  if (action.type === SET_IS_PROJECT_LOADING) {
    return action.payload;
  }
  return isProjectLoading;
};

const isProjectModalVisible = (isProjectModalVisible = false , action) => {
  if (action.type === SET_IS_PROJECT_MODAL_VISIBLE) {
    return action.payload;
  }
  return isProjectModalVisible
}

const productList = (productList = [] , action) => {
  if (action.type === SET_PRODUCT_LIST) {
    return action.payload;
  }
  return productList
}

// Helper function to make dispatch call cleaner.
export const setIsProjectLoading = (isProjectLoading) => {
  return {
    type: SET_IS_PROJECT_LOADING,
    payload: isProjectLoading,
  };
};

export const setIsProjectModalVisible = (isProjectModalVisible) => {
  return {
    type: SET_IS_PROJECT_MODAL_VISIBLE,
    payload: isProjectModalVisible
  }
};

export const setProductList = (productList) => {
  return {
    type: SET_PRODUCT_LIST,
    payload: productList
  }
};

export const reduxReducers = {
  isProjectLoading,
  isProjectModalVisible,
  productList,
};
