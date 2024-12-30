interface ICallbackFunction {
  (e: Event): void;
}

export function handleEnterKey(e: KeyboardEvent, callback: ICallbackFunction) {
  if (e.key === 'Enter') {
    callback(e);
  }
}
