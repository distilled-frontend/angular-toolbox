import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { examples } from '../examples';

@Component({
  selector: 'ui-app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class TableOfContentsComponent {
  items = examples.map((example) => ({
    name: example.name,
    description: example.description,
    path: example.path,
  }));
}
