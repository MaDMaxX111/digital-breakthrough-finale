import  { LOGIN_URL, SIGNUP_URL } from '../constants/route'
import AuthPage from '../pages/auth/index';
import SignupPage from '../pages/signup/index';

export default [
    {
        path: LOGIN_URL,
        component: AuthPage
    },
    {
        path: SIGNUP_URL,
        component: SignupPage
    },
]
