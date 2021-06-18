import { Project } from '@yarnpkg/core';

import { openVersionFile } from '../../utils/version.utils';
import { reportGenerator } from './utils/report.generator';
import { ReportModel, ReportGeneratorOptions } from './report.types';

export class ReportManager {
  /**
   * @TODO Add ignoring by `project.topLevelWorkspace`
   */
  public async generateReport(project: Project, options: ReportGeneratorOptions): Promise<ReportModel> {
    const { ignoreRoot = false, topological = true } = options || {};

    const info = await openVersionFile(project);
    if (!info) {
      throw new Error('No any relevant information about the project');
    }

    const report = reportGenerator(info, ignoreRoot);

    // if (topological) {
    //   const workspaces = report.changedWorkspaces.reduce((acc: string[], item) => {
    //     return [...acc, item.name];
    //   }, []);

    //   const dependencies = report.changedWorkspaces.map((workspace) => {
    //     const data = [...workspace.dependencies].filter(([_, dependency]) => {
    //       return workspaces.includes(dependency.name);
    //     });
    //     return [workspace.name, data.map(([_, d]) => d)];
    //   });

    //   console.dir(dependencies);
    // }

    return report;
  }
}
