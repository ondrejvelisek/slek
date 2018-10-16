import React from 'react';
import { connect } from "react-redux";
import Channels from "../components/Channels";
import { addChannel } from "../actions/Channels";

const mapStateToProps = (state) => ({
  channels: state.channels
});

// const mapDispatchToProps = {
//   addChannel
// };


const mapDispatchToProps = {
  addChannel
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
