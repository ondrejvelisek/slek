import { connect } from 'react-redux';
import {ILoginActions, ILoginProps, Login} from '../../components/chat/Login';
import {login} from '../../actions/chat/Auth';
import {IRootState} from '../../states/IRootState';
import {selectAuthState} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): ILoginProps => ({
  ...selectAuthState(state)
});

const mapDispatchToProps: ILoginActions = {
    login,
};

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
