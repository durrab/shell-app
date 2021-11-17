export const placeholder = (placeholder = {}, action) => {
  if (action.type === 'PLACEHOLDER') {
    return action.payload;
  }
  return placeholder;
};