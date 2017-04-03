import { Component } from '@angular/core';

import { Shipment } from './shipment';
import { EditService } from './edit.service'

@Component({
  selector: 'edit-page',
  templateUrl: './edit.component.html',
  providers: [ EditService ]
})
export class EditComponent {

  constructor(private editService: EditService) {}

  model = new Shipment('', '', 0);
  submitted = false;
  responseMessage = '';

  onSubmit() {
    this.editService.postShipment(this.model).subscribe(
      (response) => { this.submitted = true; this.responseMessage = 'Leveransen är nu bokförd!';},
      (error) => { this.submitted = true; this.responseMessage =
        'Det var något konstigt med den där leveransen, var god försök igen.';}
    );

  }

  newShipment() {
    this.submitted = false;
    this.model = {vara:'', stad:'', antal:0}
  }
}
