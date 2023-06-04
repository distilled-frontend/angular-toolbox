import { Routes, UrlSegment } from '@angular/router';

import { UrlMatcher } from '@angular/router';
import { StringMatcherComponent } from './string-matcher.component';
import { NumberMatcherComponent } from './number-matcher.component';
import { BoolMatcherComponent } from './bool-matcher.component';
import { DynamicUrlMatcherComponent } from './dynamic-url-matcher.component';

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

function createDataTypeMatcher(expectedType: string): UrlMatcher {
    return (segments: UrlSegment[]) => {
        if (segments.length !== 1 || getDatatype(segments[0].path) !== expectedType) {
            return null;
        }

        return {
            consumed: segments,
            posParams: {
                value: segments[0]
            }
        };
    }
}


function getDatatype(value: any) {
    if (value === 'true' || value === 'false') {
        return 'boolean';
    }
    if (value === 'null') {
        return 'null';
    }
    if (value === 'undefined') {
        return 'undefined';
    }
    if (!isNaN(parseInt(value))) { 
        return 'number';
    }
    return 'string';
}

function extractParams(
  diskSegment?: UrlSegment,
  folderSegment?: UrlSegment,
  fileSegment?: UrlSegment
) {
  const disk = checkDisk(diskSegment?.path);
  const folder = checkFolder(folderSegment?.path);
  const file = checkFile(fileSegment?.path);

  return {
    ...(disk ? { disk: diskSegment } : {}),
    ...(folder ? { folder: folderSegment } : {}),
    ...(file ? { file: fileSegment } : {}),
  };
}

function checkDisk(path: string | undefined) {
  return path;
}

function checkFolder(path: string | undefined) {
  return path;
}

function checkFile(path: string | undefined) {
  return path;
}

function validateLocationSegments(segments: UrlSegment[]) {
  return true;
}
