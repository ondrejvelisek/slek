import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IProtectedActions, IProtectedProps, Protected} from '../../components/chat/Protected';
import {push} from 'connected-react-router';

const mapStateToProps = (state: IRootState): IProtectedProps => ({
  authorized: state.chat.auth.content !== null && !state.chat.auth.isLoading && !state.chat.auth.error
});

const mapDispatchToProps: IProtectedActions = {
  onUnauthorizedAccess: () => push('/login')
};

export const ProtectedContainer = connect(mapStateToProps, mapDispatchToProps)(Protected);
