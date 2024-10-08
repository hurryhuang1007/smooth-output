# smooth-output

`Make the output smoother~ (commonly used for handling SSE text output scenarios)`

SmoothOutput is a utility class designed to smoothly output strings at a controlled pace. It supports output animation using either requestAnimationFrame (RAF) or a timer.

[![NPM version](https://img.shields.io/npm/v/smooth-output.svg?style=flat)](https://npmjs.com/package/smooth-output)
[![NPM downloads](http://img.shields.io/npm/dm/smooth-output.svg?style=flat)](https://npmjs.com/package/smooth-output)
[中文文档](https://github.com/hurryhuang1007/smooth-output/blob/main/README.zh.md)

## Install

```bash
npm install smooth-output
```

## Features

- automatically adjust the output speed according to the rate of input.
- support random output pauses to simulate human typing and thinking.
- not limited to a framework (e.g. React, Vue).
- support Node.js and browser environments.
- easy to use.

## Live Demo

<https://codesandbox.io/p/sandbox/smooth-output-live-demo-qjdc48>

## API

### Constructor

```typescript
new SmoothOutput(output: (output: string) => void, options?: {
  fps?: number;
  useRAF?: boolean;
  minStepTime?: number;
  maxStepTime?: number;
  randomStepTimeMaxDiff?: number;
  inputType?: PutType;
  outputType?: PutType;
});
```

#### Parameters

- output (function): A callback function to receive the output string at each step.
- fps (number, optional): Frames per second, controlling the update frequency of the output. Default is 40.
- useRAF (boolean, optional): Whether to use requestAnimationFrame for output updates. Default is true.
- minStepTime (number, optional): Minimum time to digest an input in milliseconds. Default is 100.
- maxStepTime (number, optional): Maximum time to digest an input in milliseconds. Default is 2000.
- randomStepTimeMaxDiff (number, optional): The maximum random reduction value of the time to digest an input (used for random output pauses to simulate human typing and thinking) in milliseconds. Default is 200.
- inputType (PutType, optional): Input type, can be "full" or "slice". Default is "slice".
- outputType (PutType, optional): Output type, can be "full" or "slice". Default is "full".

### Methods

- `input(str: string): void`

  Inputs a string and smoothly outputs it according to the configured pacing parameters.

- `async beDisposed(): Promise<void>`

  Mark the instance as disposed. It is not necessary to call this function, but calling this function will get an output end Promise.

## Basic Usage

```javascript
import SmoothOutput from 'smooth-output';

const so = new SmoothOutput((output) => {
  console.log('output', output);
});
so.input('Hello, world! ');
setTimeout(() => {
  so.input('This is a test.');
}, 1000);

// console log may be:

// output Hell
// output Hello, w
// ...
// output Hello, world! 

// output Hello, world! T
// output Hello, world! Th
// output Hello, world! Thi
// ...
// output Hello, world! This is a test.
```

## Example

see <https://codesandbox.io/p/sandbox/smooth-output-live-demo-qjdc48>

## React Example

TODO

## Vue Example

TODO

## LICENSE

MIT
