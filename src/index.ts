import { Plugin } from '@yarnpkg/core';

import { ReportCommand } from './commands/release/report';

const plugin: Plugin = {
  commands: [ReportCommand],
};

export default plugin;
