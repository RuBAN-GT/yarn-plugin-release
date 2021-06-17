import { PortablePath } from '@yarnpkg/fslib';

export interface ReportModel {
  generatedAt: number;
  root: string | PortablePath | null;
  changedWorkspaces: ReportWorkspaceModel[];
}

export interface ReportWorkspaceModel {
  fullName: string;
  name: string;
  scope: string | null;
  path: string | PortablePath;
  relativePath: string | PortablePath;
  currentVersion: string;
  changedFiles: Array<string | PortablePath>;
}
