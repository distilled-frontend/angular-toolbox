import { UrlMatcher, UrlSegment } from "@angular/router";

export function createDataTypeMatcher(expectedType: string): UrlMatcher {
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


export function getDatatype(value: any) {
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

export function extractParams(
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

export function checkDisk(path: string | undefined) {
  return path;
}

export function checkFolder(path: string | undefined) {
  return path;
}

export function checkFile(path: string | undefined) {
  return path;
}

export function validateLocationSegments(segments: UrlSegment[]) {
  return true;
}
