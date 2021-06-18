import { ReportModel } from '../report.types';

export function reportTopologySorter(report: ReportModel): ReportModel {
  report.changedWorkspaces = report.changedWorkspaces;

  return report;
}
