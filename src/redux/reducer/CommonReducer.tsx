interface StateType {
  token: string;
}

const commonState: StateType = {
  token: '',
};

export default (state = commonState, action: any) => {
  switch (action.type) {
    case "CHANGE_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
