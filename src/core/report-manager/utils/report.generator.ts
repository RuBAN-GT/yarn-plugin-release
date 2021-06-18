import { VersionFile } from '../../../utils/version.utils';
import { ReportModel } from '../report.types';

export function reportGenerator(info: VersionFile, ignoreRoot: boolean = false): ReportModel {
  const { changedFiles, changedWorkspaces, root } = info;

  const report: ReportModel = {
    generatedAt: Date.now(),
    root: root,
    changedWorkspaces: [...changedWorkspaces]
      .filter(({ cwd }) => !ignoreRoot || cwd !== root)
      .map(({ locator, cwd, relativeCwd, manifest }) => ({
        fullName: manifest.raw.name || locator.name,
        name: locator.name,
        scope: locator.scope,
        path: cwd,
        relativePath: relativeCwd,
        currentVersion: locator.reference,
        changedFiles: [],
        dependencies: manifest.dependencies,
      }))
      .sort((a, b) => (a.path.length >= b.path.length ? -1 : 1)),
  };

  changedFiles.forEach((file) => {
    const targetWorkspace = report.changedWorkspaces.find(({ path }) => file.includes(path));
    if (targetWorkspace) {
      targetWorkspace.changedFiles.push(file);
    }
  });

  return report;
}
