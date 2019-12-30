import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContactComponent } from "./contact.component";
import { ContactService } from "./contact.service";

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: [ContactComponent],
  providers: [ContactService],
  exports: [ContactComponent]
})
export class ContactModule {}
