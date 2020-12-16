import { getBaiduReverseAddressResolution } from '../../utils/getLocation';

export const asyncChangeLocation = () => {
  return async (dispatch: any) => {
    const data: any = await getBaiduReverseAddressResolution();
    const params: any = {
      type: 'ASYNC_CHANGE_LOCATION',
      payload: {
        data
      }
    };
    dispatch(params);
  }
}

