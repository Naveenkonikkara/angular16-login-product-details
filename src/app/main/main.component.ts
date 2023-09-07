import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'JK Tech Products ' + VERSION.full;

  constructor() {}

  ngOnInit() {}
}
