import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  lat = 42.4881321;
  lng = -83.1440455;
  zoom = 16;
  hoursTitle = 'Hours';
  locationTitle = 'Location';
  address = '115 E. 3rd Street';
  addressDesc = '';
  hours: any[] = [
    { day: 'Monday', hours: '10am-12pm & 2pm-4pm' },
    { day: 'Tuesday', hours: '9am-1pm & 3pm-6pm' },
    { day: 'Wednesday', hours: '10am-12pm & 2pm-4pm' },
    { day: 'Thursday', hours: '3pm-6pm' },
    { day: 'Saturday', hours: '10am-12pm' }
  ];

  constructor() { }

  public ngOnInit() {
    $( document ).ready(function() {
      const interval = setInterval(function () {
        const googleLogo = $('img[style*="66px"]');

        if (googleLogo.length) {
            clearInterval(interval);
            googleLogo.css('left', '120px');
        }
      }, 100);
    });
  }
}
