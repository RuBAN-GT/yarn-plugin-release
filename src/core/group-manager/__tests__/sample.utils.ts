import { SamplePreset, SampleFullPreser } from './sample.types';

export function samplePresetConverter(preset: SamplePreset): SampleFullPreser {
  return {
    groupBy: preset.groupBy,
    input: preset.input.map((chain) => chain.split('.')),
    output: preset.output.map((group) => group.map((chain) => chain.split('.'))),
  };
}
