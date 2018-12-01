import { connect } from 'react-redux';
import {Channels, IChannelsActions, IChannelsProps} from '../../components/chat/Channels';
import { getChannels} from '../../actions/chat/Channels';
import {IRootState} from '../../states/IRootState';
import {selectActiveAccountEmail, selectChannelIds, selectChannelsState} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IChannelsProps => ({
  isLoading: selectChannelsState(state).isLoading,
  error: selectChannelsState(state).error,
  content: selectChannelIds(state),
  email: selectActiveAccountEmail(state)
});

const mapDispatchToProps: IChannelsActions = {
  onMounted: getChannels,
  onReloadChannels: getChannels
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
