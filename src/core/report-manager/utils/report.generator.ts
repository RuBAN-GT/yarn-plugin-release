import { LocatorHash } from '@yarnpkg/core';

import { VersionFile } from '../../../utils/version.utils';
import { ReportModel } from '../report.types';

export function reportGenerator(info: VersionFile, ignoreList: LocatorHash[] = []): ReportModel {
  const { changedFiles, changedWorkspaces, root } = info;

  const report: ReportModel = {
    generatedAt: Date.now(),
    root: root,
    changedWorkspaces: [...changedWorkspaces]
      .filter(({ locator }) => !ignoreList.includes(locator.locatorHash))
      .map(({ locator, cwd, relativeCwd, manifest }) => ({
        fullName: manifest.raw.name || locator.name,
        name: locator.name,
        scope: locator.scope,
        locatorHash: locator.locatorHash,
        path: cwd,
        relativePath: relativeCwd,
        currentVersion: locator.reference,
        changedFiles: [],
        dependencies: manifest.dependencies,
      })),
  };

  const workspacesByPaths = report.changedWorkspaces.sort((a, b) => (a.path.length >= b.path.length ? -1 : 1));
  changedFiles.forEach((file) => {
    const targetWorkspace = workspacesByPaths.find(({ path }) => file.includes(path));
    if (targetWorkspace) {
      targetWorkspace.changedFiles.push(file);
    }
  });

  return report;
}
