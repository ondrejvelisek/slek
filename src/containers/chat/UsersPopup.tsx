import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IUserPopupActions, IUserPopupProps, UsersPopup} from '../../components/chat/UsersPopup';
import {selectAccountEmails, selectAccountsState, selectActiveChannel} from '../../selectors/chat';
import {getAccounts} from '../../actions/chat/Accounts';
import {channelSubscribeUser, channelUnsubscribeUser} from '../../actions/chat/Channels';

const mapStateToProps = (state: IRootState): IUserPopupProps => ({
  isLoading: selectAccountsState(state).isLoading,
  error: selectAccountsState(state).error,
  content: selectAccountEmails(state),
  channel: selectActiveChannel(state)
});

const mapDispatchToProps: IUserPopupActions = {
  onMounted: getAccounts,
  channelSubscribeUser,
  channelUnsubscribeUser
};

export const UsersPopupContainer = connect(mapStateToProps, mapDispatchToProps)(UsersPopup);
