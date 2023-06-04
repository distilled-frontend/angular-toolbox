import { Component, inject } from '@angular/core';
import { LogService } from '../log.service';
import { TypeMatcher } from './abstract-type-matcher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-app-number-matcher',
  templateUrl: './number-matcher.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class NumberMatcherComponent extends TypeMatcher { }
