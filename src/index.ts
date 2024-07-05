class SmoothOutput {
  private _supportRAF = typeof requestAnimationFrame === 'function';
  private _rafID: number | null = null;
  private _disposed = false;

  private _output;
  private _fps;
  private _useRAF;
  private _minStepTime;
  private _maxStepTime;

  constructor(
    output: (s: string) => void,
    {
      fps = 40,
      useRAF = true,
      minStepTime = 100,
      maxStepTime = 2000,
    }: {
      fps?: number;
      useRAF?: boolean;
      minStepTime?: number;
      maxStepTime?: number;
    } = {}
  ) {
    this._output = output;
    this._fps = fps;
    this._useRAF = useRAF;
    this._minStepTime = minStepTime;
    this._maxStepTime = maxStepTime;
  }

  input(str: string) {
    if (this._disposed) {
      throw new Error('SmoothOutput instance has been disposed');
    }
  }

  dispose() {
    this._disposed = true;
  }
}

export default SmoothOutput;
