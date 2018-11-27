import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Avatar, IAvatarProps} from '../../components/chat/Avatar';

interface IAvatarOwnProps {
  email: string;
  className: string;
}

const mapStateToProps = (state: IRootState, ownProps: IAvatarOwnProps): IAvatarProps => {
  console.log(ownProps);
  console.log(state.chat.accounts.content);
  return ({
    ...state.chat.accounts.content.get(ownProps.email).content,
    className: ownProps.className
  });
};

export const AvatarContainer = connect(mapStateToProps)(Avatar);
