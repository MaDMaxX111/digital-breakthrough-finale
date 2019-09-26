import { all, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router';
import { LOGIN_URL } from '../../constants/route'
import actions from './actions'
// import { userMe } from '../../api'
import store from '../store';
// import { getCookie } from '../../utils'

export function* logout() {
    yield put(push(LOGIN_URL))
}

export function* checkAuthorization() {
    yield store.dispatch(actions.checkAuthorizationSuccess({userData: {}}));

    // try {
    //
    //     // условно проверяем токен в куках
    //     const csrftoken = getCookie('csrftoken');
    //     const sessionid = getCookie('sessionid');
    //
    //     if (csrftoken && sessionid) {
    //         let results = yield userMe()
    //
    //         if (results) {
    //             yield store.dispatch(actions.checkAuthorizationSuccess(results))
    //             return;
    //         }
    //     }
    //
    //     yield store.dispatch(actions.logout())
    //
    // } catch (error) {
    //     yield store.dispatch({
    //         type: actions.LOGIN_ERROR,
    //         payload: error,
    //     })
    //     yield store.dispatch(actions.logout())
    // }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
        takeEvery(actions.LOGIN_SUCCESS, checkAuthorization),
        takeEvery(actions.LOGOUT, logout),
    ])
}
