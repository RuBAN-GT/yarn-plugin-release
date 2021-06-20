import { Project } from '@yarnpkg/core';

import { openVersionFile } from '../../utils/version.utils';
import { reportGenerator } from './utils/report.generator';
import { ReportModel, ReportGeneratorOptions } from './report.types';

export class ReportManager {
  public async generateReport(project: Project, options: ReportGeneratorOptions): Promise<ReportModel> {
    const { ignoreRoot = false } = options || {};

    const info = await openVersionFile(project);
    if (!info) {
      throw new Error('No any relevant information about the project');
    }

    const ignoreList = ignoreRoot ? [project.topLevelWorkspace.locator.locatorHash] : [];
    const report = reportGenerator(info, ignoreList);

    return report;
  }
}
