import { connect } from 'react-redux';
import { Channels, IChannelsDispatchProps } from '../../components/chat/Channels';
import { addChannel } from '../../actions/chat/Channels';
import { Dispatch } from 'redux';
import { IChannels } from '../../states/chat/IChat';
import * as Immutable from 'immutable';

const mapStateToProps = (state: IChannels) => {
  return {
    channels: state
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
  return {
    addChannel: (name: string, messages: number, accountIds: Immutable.List<number>) => dispatch(addChannel(name, messages, accountIds)),
  };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);