import * as React from 'react';
import '../less/ChatLayout.less';
import { ILayoutProps } from '../models/IChat';

export interface IChatLayoutStateProps {
  readonly isLoading: boolean;
  readonly isSaving: boolean;
}

export interface IChatLayoutDispatchProps {
  readonly loadItems: () => void;
}

export class ChatLayout extends React.PureComponent<ILayoutProps> {
  render(): JSX.Element {
    const {
      header,
      sidebar,
      content,
      footer
    } = this.props;

    return (
      <div className="h-100 d-flex flex-column">

        <div className="header">
          {header}
        </div>

        <div className="flex-grow-1 d-flex flex-column flex-md-row">

          <div className="sidebar">
            {sidebar}
          </div>

          <div className="d-flex flex-grow-1 flex-column">

            <div className="content flex-grow-1">
              {content}
            </div>

            <div className="footer">
              {footer}
            </div>

          </div>

        </div>

      </div>
    );
  }
}
