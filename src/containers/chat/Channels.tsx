import { connect } from 'react-redux';
import { Channels, IChannelsDispatchProps } from '../../components/chat/Channels';
import { addChannel } from '../../actions/chat/Channels';
import { Dispatch } from 'redux';
import { IChannelsListState } from '../../states/chat/IChat';
import * as Immutable from 'immutable';

const mapStateToProps = (state: IChannelsListState) => {
  return {
    channelsState: state
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelsDispatchProps => {
  return {
    addChannel: (name: string, messages: number, accountIds: Immutable.List<Uuid>) => dispatch(addChannel(name, messages, accountIds)),
  };
};

export const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels);
