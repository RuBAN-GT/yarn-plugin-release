import { Project } from '@yarnpkg/core';

import { openVersionFile } from '../../utils/version.utils';
import { reportGenerator } from './report.generator';
import { ReportModel } from './report.model';

export class ReportManager {
  public async generateReport(project: Project, ignoreRoot: boolean = false): Promise<ReportModel> {
    const info = await openVersionFile(project);
    if (!info) {
      throw new Error('No any relevant information about the project');
    }

    const report = reportGenerator(info, ignoreRoot);
    return report;
  }
}
