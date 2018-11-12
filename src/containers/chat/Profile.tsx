import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IProfileActions, IProfileProps, Profile} from '../../components/chat/Profile';
import {selectActiveAccount} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IProfileProps =>
  selectActiveAccount(state);

const mapDispatchToProps: IProfileActions = {};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
