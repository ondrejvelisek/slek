import { connect } from 'react-redux';
import {Channels, IChannelsActions, IChannelsProps} from '../../components/chat/Channels';
import {createChannel, getChannels} from '../../actions/chat/Channels';
import {IRootState} from '../../states/IRootState';
import {selectChannelIds} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IChannelsProps => ({
  isLoading: state.chat.channels.isLoading,
  error: state.chat.channels.error,
  content: selectChannelIds(state)
});

const mapDispatchToProps: IChannelsActions = {
  onMounted: getChannels,
  onReloadChannels: getChannels,
  onCreateChannel: createChannel
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
