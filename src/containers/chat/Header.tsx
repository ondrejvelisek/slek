import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Header, IHeaderProps} from '../../components/chat/Header';
import {selectActiveAccount} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IHeaderProps =>
  selectActiveAccount(state);

export const HeaderContainer = connect(mapStateToProps)(Header);
