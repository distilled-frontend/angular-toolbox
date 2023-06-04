import { Component, inject } from '@angular/core';
import { LogService } from '../log.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { TypeMatcher } from './abstract-type-matcher';

@Component({
  selector: 'ui-app-bool-matcher',
  templateUrl: './bool-matcher.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BoolMatcherComponent extends TypeMatcher { }
