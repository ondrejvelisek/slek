import { connect } from 'react-redux';
import {INewChannelActions, NewChannel} from '../../components/chat/NewChannel';
import {createChannel} from '../../actions/chat/Channels';

const mapDispatchToProps: INewChannelActions = {
    onChannelAdd: createChannel
};

export const NewChannelContainer = connect(undefined, mapDispatchToProps)(NewChannel);
