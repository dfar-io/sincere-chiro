import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  copyrightText = '2017 Sincere Chiropractic. All Rights Reserved.';
  socialMediaLinks: any[] = [
    {
      link: 'https://www.facebook.com/sincerechiropractic/',
      imageUrl: './assets/socialMedia/facebook.png',
      alt: 'Facebook'
    },
    {
      link: 'https://www.instagram.com/sincerechiro/',
      imageUrl: './assets/socialMedia/instagram.png',
      alt: 'Instagram'
    },
    {
      link: 'https://www.yelp.com/biz/sincere-chiropractic-rochester',
      imageUrl: './assets/socialMedia/yelp.png',
      alt: 'Yelp'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
