interface ICallbackFunction {
  (e: Event): void;
}

export function handleKeyDown(e: KeyboardEvent, callback: ICallbackFunction) {
  if (e.key === 'Enter') {
    callback(e);
  }
}
