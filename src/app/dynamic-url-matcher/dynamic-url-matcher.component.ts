import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
  provideRouter,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { LOG_MODE, LogService } from '../log.service';
import { StateService } from '../state.service';

@Component({
  selector: 'ui-app-matcher',
  templateUrl: './dynamic-url-matcher.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicUrlMatcherComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);

  buttons = [
    {
      label: '/users/:id',
      tab: 0,
    },
    {
      label: '/users/:id/:project',
      tab: 1,
    },
    {
      label: 'custom matcher',
      tab: 2,
    },
    {
      label: 'infinite nesting',
      tab: 3,
    },
    {
      label: 'type differentiate',
      tab: 4,
    },
  ];

  set currentTab(tab: number) {
    this.state.set('dynamicMatcherTab', tab);
    this.logger.reset();
  }

  get currentTab() {
    return this.state.get('dynamicMatcherTab') || 0;
  }

  get location() {
    return window.location.pathname;
  }

  logger = inject(LogService);
  state = inject(StateService);

  params$ = this.route.params.pipe(
    map((params) => {
      return Object.keys(params).map((key) => ({
        key,
        value: params[key],
      }));
    })
  );

  ngOnInit() {
    this.logger.log('Dynamic Url Matcher Init');
  }

  ngOnDestroy() {
    this.logger.log('Dynamic Url Matcher Destroy');
  }

  navigate(userInput: string) {
    this.router.navigateByUrl(userInput);
  }
}
