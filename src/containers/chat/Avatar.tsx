import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Avatar, IAvatarProps} from '../../components/chat/Avatar';
import {IHasId} from '../../models/chat/IHasId';

interface IAvatarOwnProps extends IHasId {
  className: string;
}

const mapStateToProps = (state: IRootState, ownProps: IAvatarOwnProps): IAvatarProps => ({
  ...state.chat.accounts.content.get(ownProps.id).content,
  className: ownProps.className
});

export const AvatarContainer = connect(mapStateToProps)(Avatar);
