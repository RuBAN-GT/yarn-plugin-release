import { Plugin } from '@yarnpkg/core';

import { GraphCommand } from './commands/release/graph';
import { ReportCommand } from './commands/release/report';
import { CheckCommand, ChunksCommand } from './commands/release/version';

const plugin: Plugin = {
  commands: [ReportCommand, GraphCommand, CheckCommand, ChunksCommand],
};

export default plugin;
