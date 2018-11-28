import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Header, IHeaderActions, IHeaderProps} from '../../components/chat/Header';
import {selectActiveAccount} from '../../selectors/chat';
import {logout} from '../../actions/chat/Auth';

const mapStateToProps = (state: IRootState): IHeaderProps => {
  return selectActiveAccount(state);
};

const mapDispatchToProps: IHeaderActions = {
  logout,
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
