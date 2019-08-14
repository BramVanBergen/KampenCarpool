import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDriverComponent } from './add-driver.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [AddDriverComponent]
})
export class AddDriverModule { }
