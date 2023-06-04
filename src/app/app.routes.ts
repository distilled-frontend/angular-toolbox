import { Routes } from '@angular/router';
import { examples } from './examples';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';

const exampleRoutes: Routes = examples.map(
  (example) =>
    ({
      path: example.path,
      loadChildren: () => example.routes
    })
);

export const appRoutes: Routes = [
  {
    path: '',
    component: TableOfContentsComponent,
  },
...exampleRoutes,
];
