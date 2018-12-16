import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IProfileActions, IProfileProps, Profile} from '../../components/chat/Profile';
import {selectAuthAccount} from '../../selectors/chat';
import {updateAccount} from '../../actions/chat/Accounts';

const mapStateToProps = (state: IRootState): IProfileProps =>
  selectAuthAccount(state);

const mapDispatchToProps: IProfileActions = {
  updateAccount
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
