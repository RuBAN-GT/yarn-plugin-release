import { SamplePreset } from './sample.types';

export const Sample1: SamplePreset = {
  groupBy: 1,
  input: ['a.b.c'],
  output: [['a.b.c']],
};

export const Sample2: SamplePreset = {
  groupBy: 2,
  input: ['a', 'b', 'c', 'd'],
  output: [
    ['a', 'b'],
    ['c', 'd'],
  ],
};

export const Sample3: SamplePreset = {
  groupBy: 3,
  input: ['a.b', 'a.b.c'],
  output: [['a.b'], ['a.b.c']],
};

export const Sample4: SamplePreset = {
  groupBy: 3,
  input: ['a.b', 'a.b.c', 'd'],
  output: [['a.b', 'd'], ['a.b.c']],
};

export const Sample5: SamplePreset = {
  groupBy: 3,
  input: ['a.b', 'a.b.c', 'a.b.c.d'],
  output: [['a.b'], ['a.b.c'], ['a.b.c.d']],
};
