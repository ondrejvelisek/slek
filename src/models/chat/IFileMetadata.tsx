import {IHasId} from './IHasId';

export interface IFileMetadata extends IHasId {
  readonly name: string;
  readonly extension: string;
  readonly createdBy: string;
  readonly fileSize: number;
}
