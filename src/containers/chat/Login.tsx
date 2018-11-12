import { connect } from 'react-redux';
import {ILoginActions, ILoginProps, Login} from '../../components/chat/Login';
import {login} from '../../actions/chat/Authorisation';
import {IRootState} from '../../states/IRootState';

const mapStateToProps = (state: IRootState): ILoginProps => ({
  isLoading: state.chat.auth.isLoading,
  error: state.chat.auth.error,
  content: state.chat.auth.content
});

const mapDispatchToProps: ILoginActions = {
    login,
};

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
