import { Injectable } from "@angular/core";

@Injectable()
export class StateService {
    set(key: string, value: any) {
        this._state[key] = value;
    }

    get(key: string) {
        return this._state[key];
    }

    private _state: Record<string, any> = {};
}