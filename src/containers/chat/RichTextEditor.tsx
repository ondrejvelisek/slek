import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {createMessage, uploadFileMessage} from '../../actions/chat/Messages';
import {IRichTextEditorActions, IRichTextEditorProps, RichTextEditor} from '../../components/chat/RichTextEditor';

const mapStateToProps = (_: IRootState): IRichTextEditorProps => {
  return {};
};

const mapDispatchToProps: IRichTextEditorActions = {
  onMessageSubmit: createMessage,
  onFileUpload: uploadFileMessage
};

export const RichTextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);
