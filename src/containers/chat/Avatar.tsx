import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {Avatar, IAvatarProps} from '../../components/chat/Avatar';
import {selectAccountsMap} from '../../selectors/chat';

interface IAvatarOwnProps {
  email: string;
  className: string;
}

const mapStateToProps = (state: IRootState, ownProps: IAvatarOwnProps): IAvatarProps => {
  const account = selectAccountsMap(state).get(ownProps.email);
  return {
    account,
    className: ownProps.className
  };
};

export const AvatarContainer = connect(mapStateToProps)(Avatar);
