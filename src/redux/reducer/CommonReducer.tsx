interface StateType {
  showLoading: boolean;
  showLoginPopup: boolean;
  addressObj: any;
  [propName: string]: any;
}

const commonState: StateType = {
  showLoading: false,
  showLoginPopup: false,
  addressObj: {},
};

export default (state = commonState, action: any) => {
  switch (action.type) {
    case "CHANGE_LOADING_STATUS":
      return {
        ...state,
        showLoading: action.payload.showLoading,
      };
    case "CHANGE_LOGINPOPUP_SHOW":
      return {
        ...state,
        showLoginPopup: action.payload.showLoginPopup,
      };
    case "ASYNC_CHANGE_LOCATION":
      return {
        ...state,
        addressObj: action.payload.data,
      };
    default:
      return state;
  }
};
