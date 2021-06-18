import { Plugin } from '@yarnpkg/core';

import { ReportCommand } from './commands/release/report';
import { TopologyCommand } from './commands/topology/topology';

const plugin: Plugin = {
  commands: [ReportCommand, TopologyCommand],
};

export default plugin;
