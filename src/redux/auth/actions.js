const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  CHECK_AUTHORIZATION_SUCCESS: 'CHECK_AUTHORIZATION_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({
    type: actions.CHECK_AUTHORIZATION
  }),
  checkAuthorizationSuccess: data => ({
    type: actions.CHECK_AUTHORIZATION_SUCCESS,
    payload: data,
  }),
  loginSuccess: (data = {}) => ({
    type: actions.LOGIN_SUCCESS,
    payload: data
  }),
  logout: () => ({
    type: actions.LOGOUT
  })
};
export default actions;
