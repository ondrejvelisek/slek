import { connect } from 'react-redux';
import {Channels, IChannelsActions, IChannelsProps} from '../../components/chat/Channels';
import {createChannel, getChannels} from '../../actions/chat/Channels';
import {IRootState} from '../../states/IRootState';
import {selectChannelIds, selectChannelsState} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IChannelsProps => ({
  isLoading: selectChannelsState(state).isLoading,
  error: selectChannelsState(state).error,
  content: selectChannelIds(state)
});

const mapDispatchToProps: IChannelsActions = {
  onMounted: getChannels,
  onReloadChannels: getChannels,
  onCreateChannel: createChannel
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
