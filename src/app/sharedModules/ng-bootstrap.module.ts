import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule.forRoot(),
    NgbCollapseModule.forRoot()
  ],
  exports: [
    NgbAlertModule,
    NgbCollapseModule
  ],
  declarations: []
})
export class NgBootstrapModule {
}
