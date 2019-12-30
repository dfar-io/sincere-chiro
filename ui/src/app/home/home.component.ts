import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  phoneNumber = '248.923.2428';
  overlayText = 'We\'ve Got Your Back';
  links: any[] = [
    { title: 'About', link: '#bio' },
    { title: 'Conditions', link: '#conditions' },
    { title: 'Services', link: '#services' },
    { title: 'Insurances', link: '#insurances' },
    { title: 'Contact', link: '#contact' },
    { title: 'Hours', link: '#hours' }
  ];

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      const interval = setInterval(function () {
        const width = $(window).width();
        const desktopWidth = 992;

        const navbar = $('.navbar-static-top');
        const overlayContent = $('#overlay-content');
        const img = $('img');

        if (width >= 992) {
          $('#overlay').fadeIn('slow')
                     .delay(1500)
                     .fadeOut('slow', function() {
                          navbar.css({opacity: 0.0, visibility: 'visible'})
                                .animate({opacity: 1.0});
                          img.css({opacity: 0.0, visibility: 'visible'})
                             .animate({opacity: 1.0});
                          overlayContent.css('visibility', 'visible');
                      });
        } else {
          navbar.css('visibility', 'visible');
          img.css('visibility', 'visible');
          overlayContent.css('visibility', 'visible');
        }

        clearInterval(interval);
      }, 100);
    });
  }

}
