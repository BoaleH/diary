export const changeToken = (token: string) => {
  return {
    type: 'CHANGE_TOKEN',
    payload: {
      token
    }
  }
};
