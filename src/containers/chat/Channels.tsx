import { connect } from 'react-redux';
import {Channels, IChannelsActions, IChannelsProps} from '../../components/chat/Channels';
import { addChannel } from '../../actions/chat/Channels';
import {IRootState} from '../../states/IRootState';
import {selectChannelsKeys} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IChannelsProps => {
  return {
    isLoading: state.chat.channels.isLoading,
    error: state.chat.channels.error,
    content: selectChannelsKeys(state)
  };
};

const mapDispatchToProps: IChannelsActions = {
    addChannel
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
