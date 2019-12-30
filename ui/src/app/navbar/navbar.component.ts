import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  phoneNumber = "248.923.2428";
  links: any[] = [
    { title: "About", link: "#bio" },
    { title: "Conditions", link: "#conditions" },
    { title: "Services", link: "#services" },
    { title: "Insurances", link: "#insurances" },
    { title: "Contact", link: "#contact" },
    { title: "Hours", link: "#hours" }
  ];

  constructor() {}

  public ngOnInit() {
    $(document).ready(function() {
      const $window = $(window);

      $(function() {
        const desktopWidth = 992;
        const navbarDisplayHeight = 100;

        $(window).scroll(function() {
          const windowSize = $window.width();

          if (windowSize < desktopWidth) {
            $(".fixed-top").show();
            return;
          }

          $(this).scrollTop() >= navbarDisplayHeight
            ? $(".fixed-top").fadeIn()
            : $(".fixed-top").fadeOut();
        });
      });
    });
  }
}
