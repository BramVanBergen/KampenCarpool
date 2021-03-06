import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CampsComponent} from './camps.component';
import {RouterModule} from '@angular/router';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbAlertModule
  ],
  declarations: [CampsComponent]
})
export class CampsModule { }
