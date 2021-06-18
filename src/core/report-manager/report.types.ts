import { Descriptor, IdentHash, LocatorHash } from '@yarnpkg/core';
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
  locatorHash: LocatorHash;
  currentVersion: string;
  changedFiles: Array<string | PortablePath>;
  dependencies: Map<IdentHash, Descriptor>;
}

export interface ReportGeneratorOptions {
  ignoreRoot?: boolean;
  topological?: boolean;
}
