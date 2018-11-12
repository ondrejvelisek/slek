import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {ILoginActions, ILoginProps, Login} from '../../components/chat/Login';
import {login} from '../../actions/chat/Authorisation';

const mapStateToProps = (state: IRootState): ILoginProps => ({
  token: state.chat.auth.content.token,
  expiration: state.chat.auth.content.expiration
});

const mapDispatchToProps: ILoginActions = {
    login,
};

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
