import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {IInputBoxActions, IInputBoxProps, InputBox} from '../../components/chat/InputBox';
import {createMessage, uploadFileMessage} from '../../actions/chat/Messages';

const mapStateToProps = (_: IRootState): IInputBoxProps => {
  return {};
};

const mapDispatchToProps: IInputBoxActions = {
  onMessageSubmit: createMessage,
  onFileUpload: uploadFileMessage
};

export const InputBoxContainer = connect(mapStateToProps, mapDispatchToProps)(InputBox);
