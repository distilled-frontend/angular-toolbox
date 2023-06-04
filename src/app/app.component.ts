import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOG_MODE, LogService } from './log.service';

@Component({
  selector: 'ui-app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  clearLogs() {
    this.logBase.nativeElement.innerHTML = '';
  }
  @ViewChild('logBase', { static: true }) logBase!: ElementRef<HTMLElement>;

  constructor(private _logService: LogService) {
    this._logService.mode = LOG_MODE.HTML;
  }
  ngAfterViewInit() {
    this._logService.htmlElement = this.logBase.nativeElement;
  }
}
