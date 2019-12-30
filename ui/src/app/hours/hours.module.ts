import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursComponent } from './hours.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAA6YWknMqrvJRLTiCldLdwV5FlmJ5Fq3c'
    })
  ],
  declarations: [HoursComponent],
  exports: [HoursComponent]
})
export class HoursModule { }
