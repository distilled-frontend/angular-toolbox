import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  get mode() {
    return this._mode;
  }

  set mode(value: LOG_MODE) {
    this._mode = value;
  }

  private _mode: LOG_MODE = LOG_MODE.IGNORE;

  get htmlElement() {
    return this._htmlElement;
  }

  set htmlElement(value: HTMLElement | null) {
    this._htmlElement = value;
  }

  private _htmlElement: HTMLElement | null = null;

  log(message: string) {
    switch (this.mode) {
      case LOG_MODE.IGNORE:
        break;
      case LOG_MODE.CONSOLE:
        console.log(message);
        break;
      case LOG_MODE.HTML:
        if (this.htmlElement) {
            const now = new Date();
            const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
          this.htmlElement.innerHTML += `${timestamp} - ${message}<br>`;
        }
    }
  }

  reset() {
    if (this.htmlElement) {
      this.htmlElement.innerHTML = '';
    }
  }
}

export enum LOG_MODE {
  IGNORE,
  CONSOLE,
  HTML,
}
