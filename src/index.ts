export type PutType = "full" | "slice";

class SmoothOutput {
  private _lastInputTime = Date.now();
  private _appendEndTime = 0; // The end time when the current input is completely output to the output
  private _supportRAF: boolean;
  private _lastAFTime = 0; // last animation frame time
  // private _rafID: number | null = null;
  private _looping = false;
  private _disposed: false | (() => void) = false;

  private _output;
  private _fps;
  private _useRAF;
  private _minStepTime;
  private _maxStepTime;
  private _randomStepTimeMaxDiff;
  private _inputType;
  private _outputType;

  private _inputted = "";
  private _outputted = "";

  constructor(
    output: (s: string) => void,
    {
      fps = 40,
      useRAF = true,
      minStepTime = 100,
      maxStepTime = 2000,
      randomStepTimeMaxDiff = 200,
      inputType = "slice",
      outputType = "full",
    }: {
      fps?: number;
      useRAF?: boolean;
      minStepTime?: number;
      maxStepTime?: number;
      randomStepTimeMaxDiff?: number;
      inputType?: PutType;
      outputType?: PutType;
    } = {}
  ) {
    this._output = output;
    this._fps = fps;
    this._useRAF = useRAF;
    this._minStepTime = minStepTime;
    this._maxStepTime = maxStepTime;
    this._randomStepTimeMaxDiff = randomStepTimeMaxDiff;
    this._inputType = inputType;
    this._outputType = outputType;

    this._supportRAF = useRAF && typeof requestAnimationFrame === "function";
    // this._loop();
  }

  private _loop = () => {
    this._looping = false;
    const now = Date.now();

    if (this._supportRAF) {
      if (now - this._lastAFTime < 1000 / this._fps) {
        this._callLoop();
        return;
      }
      this._lastAFTime = now;
    }

    let output = "";
    const appendDuration = this._appendEndTime - now;
    if (appendDuration <= 0) {
      output = this._inputted;
    } else {
      const willAppend = this._inputted.slice(this._outputted.length);
      output =
        this._outputted +
        willAppend.slice(
          0,
          Math.ceil(willAppend.length / (appendDuration / (1000 / this._fps)))
        );
    }

    if (this._outputType === "full") {
      this._output(output);
    } else {
      this._output(output.slice(this._outputted.length));
    }
    this._outputted = output;

    this._callLoop();
  };

  private _callLoop() {
    if (this._looping) {
      return;
    }

    if (this._inputted === this._outputted) {
      // this._looping = false;
      if (this._disposed) {
        this._disposed();
      }
      return;
    }

    this._looping = true;
    if (this._supportRAF) {
      requestAnimationFrame(this._loop);
    } else {
      setTimeout(this._loop, 1000 / this._fps);
    }
  }

  input(str: string) {
    if (this._disposed) {
      throw new Error("SmoothOutput instance has been disposed");
    }

    if (this._inputType === "full") {
      this._inputted = str;
    } else {
      this._inputted += str;
    }

    const now = Date.now();
    let stepTime = now - this._lastInputTime;
    if (this._randomStepTimeMaxDiff) {
      stepTime -= Math.floor(Math.random() * this._randomStepTimeMaxDiff);
    }
    this._lastInputTime = now;
    this._appendEndTime =
      now + Math.min(this._maxStepTime, Math.max(this._minStepTime, stepTime));

    this._callLoop();
  }

  async beDisposed() {
    // const handle = Promise.withResolvers<void>();
    // this._disposed = handle.resolve;
    // return handle.promise;
    return new Promise<void>((resolve) => {
      this._disposed = resolve;

      if (this._outputted === this._inputted) {
        resolve();
      }
    });
  }
}

export default SmoothOutput;
