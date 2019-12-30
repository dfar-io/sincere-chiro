import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
  conditionsTitle: string = "Conditions Treated";
  conditionsText: string =
    "There are a wide range of benefits that can be " +
    "attained through seeing your licensed practitioner. We can treat a " +
    "variety of conditions, some of which, might be surprising to you.";
  conditions: Array<string> = [
    "Back Pain",
    "Neck Pain",
    "Headaches",
    "Soreness",
    "Sports Injuries",
    "Disc Bulges",
    "Pregnancy Pains",
    "Sciatica",
    "Asthma",
    "Seasonal Allergies",
    "Knee/Shoulder Pain"
  ];

  servicesTitle: string = "Services";
  services: Array<string> = [
    "Chiropractic Adjustments",
    "Massage Therapy",
    "Digital X-rays",
    "IASTM (instrument-assisted soft tissue mobilization)",
    "Kinesiology Taping",
    "Mechanical Traction"
  ];
  techniques: Array<string> = [
    "Pediatric Chiropractic Care",
    "Pregnancy Care",
    "Full Spine",
    "Diversified",
    "Thompson Drop",
    "Gonstead",
    "Extremity Adjusting",
    "Toggle Recoil",
    "Webster's Technique",
    "Activator",
    "Athletic Care"
  ];

  insurancesTitle: string = "Insurances Accepted";
  insurances: Array<string> = [
    "Aetna",
    "Blue Cross Blue Shield",
    "Blue Care Network",
    "Cigna",
    "Cofinity",
    "HAP",
    "Medicare",
    "Meridian",
    "Messa",
    "Priority Health",
    "United Health Care"
  ];
  insuranceText: string = "We offer affordable individual or family plans.";

  constructor() {}

  ngOnInit() {}
}
