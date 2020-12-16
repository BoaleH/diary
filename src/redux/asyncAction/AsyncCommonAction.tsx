export const asyncChangeLocation = () => {
  return async (dispatch: any) => {
    const data: any = {};
    const params: any = {
      type: 'ASYNC_CHANGE_LOCATION',
      payload: {
        data
      }
    };
    dispatch(params);
  }
}

