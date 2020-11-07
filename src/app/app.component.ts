import { Component, OnInit } from '@angular/core';

import { APIService, SearchablePostSortableFields, SearchableSortDirection } from './api.service';
import * as t from '../types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
