import { Component, inject } from '@angular/core';
import { LogService } from '../log.service';
import { TypeMatcher } from './abstract-type-matcher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-app-string-matcher',
  templateUrl: './string-matcher.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class StringMatcherComponent extends TypeMatcher { }
