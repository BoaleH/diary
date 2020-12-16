export const changeLoadingStatus = (showLoading: boolean) => {
  return {
    type: 'CHANGE_LOADING_STATUS',
    payload: {
      showLoading
    }
  }
}

export const changeLoginPopupShow = (showLoginPopup: boolean) => {
  return {
    type: 'CHANGE_LOGINPOPUP_SHOW',
    payload: {
      showLoginPopup
    }
  }
}