import { Component } from '@angular/core';
import { Routes, UrlSegment } from '@angular/router';
import {  validateLocationSegments } from './utils';
@Component({})
class LocationComponent {}
@Component({})
class MyComponent {}

export const DemoRoutes: Routes = [
  {
    path: 'my-path',
    component: MyComponent,
  },
  {
    matcher: (segments: UrlSegment[]) => {
      if (segments.length !== 1 || segments[0].path !== 'my-path') {
        return null;
      }

      return { consumed: segments };
    },
    component: MyComponent,
  },
];

export const LocationDemoRoutes: Routes = [
  {
    path: 'location',
    component: LocationComponent,
  },
  {
    path: 'location/:disk',
    component: LocationComponent,
  },
  {
    path: 'location/:disk/:folder',
    component: LocationComponent,
  },
  {
    path: 'location/:disk/:folder/:file',
    component: LocationComponent,
  },
];

export const LocationMatcherRoutes: Routes = [
  {
    matcher: locationMatcher,
    component: LocationComponent,
  },
];

function locationMatcher(segments: UrlSegment[]) {
  if (!matchLocationRoute(segments)) {
    return null;
  }

  return {
    consumed: segments,
    posParams: extractParams(...segments.slice(1, 4)),
  };
}

export function extractParams(
  diskSegment?: UrlSegment,
  folderSegment?: UrlSegment,
  fileSegment?: UrlSegment
) {
  const disk = diskSegment?.path;
  const folder = folderSegment?.path;
  const file = fileSegment?.path;

  return {
    ...(disk ? { disk: diskSegment } : {}),
    ...(folder ? { folder: folderSegment } : {}),
    ...(file ? { file: fileSegment } : {}),
  };
}

function matchLocationRoute(segments: UrlSegment[]): boolean {
  return (
    segments[0].path !== 'location' ||
    segments.length > 4 ||
    !validateLocationSegments(segments)
  );
}
