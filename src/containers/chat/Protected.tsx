import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IProtectedActions, IProtectedProps, Protected} from '../../components/chat/Protected';
import {authorizeAccount} from '../../actions/chat/Accounts';
import {selectAuthAccount, selectAuthEmail} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IProtectedProps => {
  const account = selectAuthAccount(state);
  const auth = selectAuthEmail(state);
  return {
    ...account,
    content: !!account.content,
    email: !auth.isLoading && !auth.error ? auth.content : null
  };
};

const mapDispatchToProps: IProtectedActions = {
  onMounted: authorizeAccount
};

export const ProtectedContainer = connect(mapStateToProps, mapDispatchToProps)(Protected);
