import * as React from 'react';
import {Button, Form, Input} from 'reactstrap';
import {IChannel} from '../../models/chat/IChannel';
import '../../less/chat/EditChannel.less';

interface IEditChannelProps {
  readonly channel: IChannel;
  readonly onSave: (text: string) => void;
  readonly onCancel: (channelId: Uuid) => void;
}

interface IEditChannelState {
  readonly value: string;
}

export class EditChannel extends React.PureComponent<IEditChannelProps, IEditChannelState> {
  constructor(props: IEditChannelProps) {
    super(props);

    this.state = {
      value: props.channel.name
    };
  }

  private onSave = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onSave(this.state.value);

    this.setState(_ => ({ value: '' }));
  };

  private onCancel = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onCancel(this.props.channel.id);

    this.setState(_ => ({ value: '' }));
  };

  private onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState(_ => ({ value }));
  };

  render() {
    return (
      <Form onSubmit={this.onSave} className="edit-channel">
        <Input
          value={this.state.value}
          onChange={this.onValueChanged}
          className="form-control"
        />
        <Button type="submit" className="btn btn-success">Save</Button>
        <Button type="button" className="btn btn-danger" onClick={this.onCancel}>Cancel</Button>
      </Form>
    );
  }
}
