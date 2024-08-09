# smooth-output

`使输出更加平滑~（常用于处理SSE文本输出场景）`

SmoothOutput 是一个用于以受控速度平滑输出字符串的工具类。它支持使用 requestAnimationFrame (RAF) 或定时器进行输出动画。

[![NPM 版本](https://img.shields.io/npm/v/smooth-output.svg?style=flat)](https://npmjs.com/package/smooth-output)
[![NPM 下载量](http://img.shields.io/npm/dm/smooth-output.svg?style=flat)](https://npmjs.com/package/smooth-output)

## 安装

```bash
npm install smooth-output
```

## 特性

- 自动根据输入速度调整输出速度。
- 支持随机暂停输出，模拟人类打字和思考。
- 不依赖于特定框架（如 React、Vue）。
- 支持 Node.js 和浏览器环境。
- 易于使用。

## 在线演示

<https://codesandbox.io/p/sandbox/smooth-output-live-demo-qjdc48>

## API

### 构造函数

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

#### 参数

- output (函数): 每一步接收输出字符串的回调函数。
- fps (数字, 可选): 每秒帧数，控制输出的更新频率。默认值为 40。
- useRAF (布尔值, 可选): 是否使用 requestAnimationFrame 进行输出更新。默认值为 true。
- minStepTime (数字, 可选): 处理输入的最小时间（毫秒）。默认值为 100。
- maxStepTime (数字, 可选): 处理输入的最大时间（毫秒）。默认值为 2000。
- randomStepTimeMaxDiff (数字, 可选): 处理输入时间的最大随机减少值（用于随机暂停输出以模拟人类打字和思考）（毫秒）。默认值为 200。
- inputType (PutType, 可选): 输入类型，可以是 "full" 或 "slice"。默认值为 "slice"。
- outputType (PutType, 可选): 输出类型，可以是 "full" 或 "slice"。默认值为 "full"。

### 方法

- `input(str: string): void`

  输入一个字符串并根据配置的节奏参数平滑输出。

- `async beDisposed(): Promise<void>`

  标记实例为已处理。通常不需要调用此函数，但调用此函数可以获得一个输出结束的 Promise。

## 基本用法

```javascript
import SmoothOutput from 'smooth-output';

const so = new SmoothOutput((output) => {
  console.log('output', output);
});
so.input('Hello, world! ');
setTimeout(() => {
  so.input('This is a test.');
}, 1000);

// 控制台输出可能是：

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

## 示例

参见 <https://codesandbox.io/p/sandbox/smooth-output-live-demo-qjdc48>

## React 示例

待添加

## Vue 示例

待添加

## 许可证

MIT
