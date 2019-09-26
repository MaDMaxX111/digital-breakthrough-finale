import store from './store';
import authActions from './auth/actions';

export default () => store.dispatch(authActions.logout())
