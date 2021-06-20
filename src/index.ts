import { Plugin } from '@yarnpkg/core';

import { GraphCommand } from './commands/release/graph';
import { ReportCommand } from './commands/release/report';

const plugin: Plugin = {
  commands: [ReportCommand, GraphCommand],
};

export default plugin;
