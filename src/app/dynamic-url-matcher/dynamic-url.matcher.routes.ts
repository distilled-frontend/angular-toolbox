import { Routes, UrlSegment } from '@angular/router';

import { UrlMatcher } from '@angular/router';
import { StringMatcherComponent } from './string-matcher.component';
import { NumberMatcherComponent } from './number-matcher.component';
import { BoolMatcherComponent } from './bool-matcher.component';
import { DynamicUrlMatcherComponent } from './dynamic-url-matcher.component';
import { Component } from '@angular/core';
import { createDataTypeMatcher, extractParams, validateLocationSegments } from './utils';

export const DynamicUrlMatcherRoutes: Routes = [
  {
    path: '',
    component: DynamicUrlMatcherComponent,
  },
  {
    path: 'users',
    component: DynamicUrlMatcherComponent,
  },
  {
    path: 'users/:id',
    component: DynamicUrlMatcherComponent,
  },
  {
    path: 'users/:id/:project',
    component: DynamicUrlMatcherComponent,
  },
  {
    path: 'lala',
    matcher: (segments: UrlSegment[]) => {
      if (
        segments[0].path !== 'location' ||
        segments.length > 4 ||
        !validateLocationSegments(segments)
      ) {
        return null;
      }

      return {
        consumed: segments,
        posParams: extractParams(...segments.slice(1, 4)),
      };
    },
    component: DynamicUrlMatcherComponent,
  },
  {
    matcher: (segments: UrlSegment[]) => {
      if (
        segments[0].path !== 'infinite-nesting'
      ) {
        return null;
      }

      return {
        consumed: segments,
        posParams: segments.slice(1).reduce((acc, seg, idx) => {
            acc[idx] = seg;
            return acc;
        }, {} as Record<string, UrlSegment>),
      };
    },
    component: DynamicUrlMatcherComponent,
  },
  {
    path: 'datatype',
    component: DynamicUrlMatcherComponent,
    children: [
        {
            matcher: createDataTypeMatcher('string'),
            component: StringMatcherComponent,
          },
          {
            matcher: createDataTypeMatcher('number'),
            component: NumberMatcherComponent,
          },
          {
            matcher: createDataTypeMatcher('boolean'),
            component: BoolMatcherComponent
          }
    ]
  }
];
