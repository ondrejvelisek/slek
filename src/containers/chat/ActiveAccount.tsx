import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {selectActiveAccount} from '../../selectors/chat';
import {logout} from '../../actions/chat/Auth';
import {ActiveAccount, IActiveAccountActions, IActiveAccountProps} from '../../components/chat/ActiveAccount';
import {getAccount} from '../../actions/chat/Accounts';

export interface IActiveAccountOwnProps {
  email: string;
}

const mapStateToProps = (state: IRootState, ownProps: IActiveAccountOwnProps): IActiveAccountProps => {
  return {
    ...selectActiveAccount(state),
    email: ownProps.email
  };
};

const mapDispatchToProps: IActiveAccountActions = {
  logout,
  onMount: getAccount
};

export const ActiveAccountContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveAccount);
