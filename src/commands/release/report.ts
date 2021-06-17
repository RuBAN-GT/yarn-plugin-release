import { CommandContext, Project } from '@yarnpkg/core';
import { Command, Usage } from 'clipanion';
import { Configuration } from '@yarnpkg/core';
import { writeFileSync } from 'fs';

import { ReportManager } from '../../core/report-manager/report.manager';

export class ReportCommand extends Command<CommandContext> {
  public static usage: Usage = Command.Usage({
    category: 'Release commands',
    description: 'Generate json report about release candidates',
  });

  @Command.Boolean('--ignore-root', {
    description: 'Ignore the root workspace',
  })
  public ignoreRoot: boolean = false;

  @Command.Boolean('--save-report', {
    description: 'Save JSON at your filesystem otherwise the result will be printed at your terminal.',
  })
  public saveReport: boolean = false;

  private reportManager: ReportManager = new ReportManager();

  @Command.Path('release', 'report')
  public async execute(): Promise<void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project } = await Project.find(configuration, this.context.cwd);

    const report = await this.reportManager.generateReport(project, this.ignoreRoot);
    this.outputReport(report);
  }

  private outputReport(report: any): void {
    const data = JSON.stringify(report);
    if (this.saveReport) {
      writeFileSync('./report.json', data, 'utf-8');
    } else {
      console.dir(data);
    }
  }
}
