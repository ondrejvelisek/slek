import { connect } from 'react-redux';
import {INewChannelActions, INewChannelProps, NewChannel} from '../../components/chat/NewChannel';
import {createChannel} from '../../actions/chat/Channels';
import {IRootState} from '../../states/IRootState';

const mapStateToProps = (_: IRootState): INewChannelProps => ({});

const mapDispatchToProps: INewChannelActions = {
    onChannelAdd: createChannel
};

export const NewChannelContainer = connect(mapStateToProps, mapDispatchToProps)(NewChannel);
