import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailMessage } from './email-message';
import { ContactService } from './contact.service';
import { ToastrService } from './service/toastr.service';
import { Form } from './model/form';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  model = this.initializeModel();
  forms: Form[] = [
    { name: 'Pain Designation Form', fileUrl: 'pain_designation_form.pdf' },
    { name: 'Patient Introduction Card', fileUrl: 'patient_intro_card.pdf' },
  ];

  constructor(private contactService: ContactService,
              private toastrService: ToastrService) { }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.contactService.postContactForm(this.model).subscribe(
      data => this.handleSuccess(),
      err => this.handleError(err)
    );
  }

  private initializeModel(): EmailMessage {
    return new EmailMessage('', '', '', '', '');
  }

  private handleSuccess() {
    this.model = this.initializeModel();
    this.toastrService.success('Message sent!');
  }

  private handleError(error: any): any {
    this.toastrService.error('We\'re having an issue, please email us at ' +
                             'drmc@sincerechiro.com.');
  }
}
