import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {Channel, IChannelProps} from '../../components/chat/Channel';

interface IChannelOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IChannelOwnProps): IChannelProps => ({
  ...state.chat.channels.content.get(ownProps.id),
  active: state.chat.channels.active === ownProps.id
});

export const ChannelContainer = connect(mapStateToProps)(Channel);
