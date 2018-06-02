import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { SimpleModalService } from 'ngx-simple-modal';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { timeout } from 'rxjs/operator/timeout';

export interface AlertModel {
  title: string;
  message: string;
}
@Pipe({name: "safeHtml"})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'alert',
  template: `
    <div class="modal-content" id="modalMessage">
      <div class="modal-body" [innerHTML]="message | safeHtml">
        
      </div>
      <div class="modal-footer">
        <button id="btnFechar" type="button" class="btn btn-pri" (click)="close();">Close</button>
      </div>
    </div>
  `
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor(private SimpleModalService: SimpleModalService) {
    super();
  }
  
  showAlert(data) {
    this.SimpleModalService.addModal(AlertComponent, {title: 'Alert title!', message: data});
  }
}