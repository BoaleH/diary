const requestSuccessPrompt = (url: string | undefined) => {
  let successPrompt = '';
  const employeeUserNo = localStorage.getItem('employeeUserNo');
  switch(url) {
    case `/employee/api/v1/modifyPersonalInfo/${employeeUserNo}`:
      successPrompt = '个人信息修改成功';
      break;
    case `/employee/api/v1/submitOpinionInfo/${employeeUserNo}`:
      successPrompt = '提交成功';
      break;
    default:
      break;
  }
  return successPrompt;
}

export default requestSuccessPrompt;