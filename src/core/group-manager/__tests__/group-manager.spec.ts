import { GroupManager } from '../group-manager';

import * as fixtures from './sample.fixture';
import { samplePresetConverter } from './sample.utils';

describe('GroupManager', () => {
  const groupManager = new GroupManager();

  describe('#prepareGroups', () => {
    it('generates groups for simple tries', () => {
      const presets = Object.values(fixtures);

      presets.forEach((preset) => {
        const fullPreset = samplePresetConverter(preset);
        const result = groupManager.prepareGroups(fullPreset as any);

        expect(result).toContain(fullPreset.output);
      });
    });
  });
});
