import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BioComponent } from "./bio/bio.component";
import { ContactModule } from "./contact/contact.module";
import { ToastrService } from "./contact/service/toastr.service";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { HoursModule } from "./hours/hours.module";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    BioComponent,
    ContentComponent
  ],
  imports: [BrowserModule, ContactModule, HoursModule],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule {}
