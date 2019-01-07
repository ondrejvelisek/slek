import * as React from 'react';
import {Editor, DraftEditorCommand, EditorState, RichUtils, convertToRaw} from 'draft-js';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faImage, faItalic, faListOl, faListUl, faPaperclip, faStrikethrough, faUnderline} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/RichTextEditor.less';
import {FormEvent} from 'react';
import {ChangeEvent} from 'react';

export interface IRichTextEditorProps {}

export interface IRichTextEditorActions {
  onMessageSubmit: (text: string) => void;
  onFileUpload: (file: File) => void;
}

export interface IRichTextEditorState {
  editorState: EditorState;
  file: string;
  showEmojiPicker: boolean;
}

export class RichTextEditor extends React.PureComponent<IRichTextEditorProps & IRichTextEditorActions, IRichTextEditorState> {
  constructor(props: IRichTextEditorProps & IRichTextEditorActions) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      file: '',
      showEmojiPicker: false
    };
  }

  handleChange = (editorState: EditorState) => {
    this.setState(() => ({
      editorState
    }));
  };

  onMessageSubmit = (event: FormEvent) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const text = JSON.stringify(convertToRaw(contentState));
    if (text.length > 0) {
      this.props.onMessageSubmit(text);
      this.setState(state => ({
        ...state,
        editorState: EditorState.createEmpty()
      }));
    }
  };

  onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && event.target.files && event.target.files.length > 0) {
      this.props.onFileUpload(event.target.files[0]);
      this.setState(state => ({...state, file: ''}));
    }
  };

  handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  onBoldClick = () => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  onItalicClick = () => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  onUnderlineClick = () => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  onStrikethroughClick = () => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  };

  onToggleCode = () => {
    this.handleChange(RichUtils.toggleCode(this.state.editorState));
  };

  onUnorderedListClick = () => {
    this.handleChange(
      RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item')
    );
  };

  onOrderedListClick = () => {
    this.handleChange(
      RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item')
    );
  };

  render() {
    return (
      <div className="rich-text-editor">
        <div className="rich-text-options">
          <Button className="btn" onClick={this.onBoldClick}>
            <FontAwesomeIcon icon={faBold}/>
          </Button>
          <Button className="btn" onClick={this.onItalicClick}>
            <FontAwesomeIcon icon={faItalic}/>
          </Button>
          <Button className="btn" onClick={this.onUnderlineClick}>
            <FontAwesomeIcon icon={faUnderline}/>
          </Button>
          <Button className="btn" onClick={this.onStrikethroughClick}>
            <FontAwesomeIcon icon={faStrikethrough}/>
          </Button>
          <Button className="btn" onClick={this.onToggleCode}>Code block</Button>
          <Button className="btn" onClick={this.onUnorderedListClick}>
            <FontAwesomeIcon icon={faListUl}/>
          </Button>
          <Button className="btn" onClick={this.onOrderedListClick}>
            <FontAwesomeIcon icon={faListOl}/>
          </Button>
        </div>
        <div className="rich-text-content">
          <Editor
            editorState={this.state.editorState}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
        <div className="rich-text-footer">
          <label htmlFor="fileUpload" className="file-upload btn btn-secondary">
            <FontAwesomeIcon icon={faPaperclip}/>
            <input id="fileUpload" type="file" onChange={this.onFileUpload} value={this.state.file}/>
          </label>
          <label htmlFor="fileUpload" className="file-upload btn btn-secondary">
            <FontAwesomeIcon icon={faImage}/>
            <input id="fileUpload" type="file" onChange={this.onFileUpload} value={this.state.file} accept="image/*"/>
          </label>
          <Button className="btn btn-send secondary" onClick={this.onMessageSubmit}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}
