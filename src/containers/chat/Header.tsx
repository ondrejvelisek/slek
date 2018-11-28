import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Header, IHeaderProps} from '../../components/chat/Header';

const mapStateToProps = (state: IRootState): IHeaderProps => {
  return {
    activeAccountEmail: state.chat.auth.content ? state.chat.auth.content.email : null,
  };
};

export const HeaderContainer = connect(mapStateToProps)(Header);
