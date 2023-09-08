import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'JK Tech Products ' + VERSION.full;

  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
