import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Header, IHeaderProps} from '../../components/chat/Header';
import {selectAuthEmail} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IHeaderProps => {
  return selectAuthEmail(state);
};

export const HeaderContainer = connect(mapStateToProps)(Header);
