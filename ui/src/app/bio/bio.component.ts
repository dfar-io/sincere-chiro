import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  doctorName: String = 'Dr. Marie-Claude Roy';
  readMoreText: String = 'Read More';
  readLessText: String = 'Read Less';
  bio: String = 'has been in practice for 12 years. She is currently the ' +
    'youngest ever to graduate from Life University in Marietta, Georgia. ' +
    'During her years in practice, Dr. M-C has taken care of patients ' +
    'ranging from newborns (literally, 1 hour old) to 90+ years of age. She ' +
    'utilizes many adjusting techniques including Full Spine, Diversified, ' +
    'Thompson Drop, Gonstead, Extremity adjusting, Toggle Recoil, Activator, ' +
    'Webster’s technique and others to fit the personalized needs of her ' +
    'patients. Dr. M-C is board-certified nationally and in Michigan. She is ' +
    'a member of the MCCA (Macomb County Chiropractic Association), MAC ' +
    '(Michigan Association of Chiropractors) and BNI (Business Network ' +
    'International). She received a Patients\' Choice Award for Chiropractor ' +
    'in Rochester, Mi and other awards for her involvement and support in ' +
    'the community.';
  bio2: String = 'When Dr. M-C is not adjusting patients, she is taking ' +
    'care of her 2 young children Daxten and Olivia. She also enjoys being ' +
    'outside, CrossFit and playing golf. Her goal is to help heal as many ' +
    'people as she can, one spine at a time!';

  constructor() { }

  ngOnInit() { }
}
