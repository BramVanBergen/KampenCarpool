import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCampComponent} from './add-camp.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [AddCampComponent]
})
export class AddCampModule { }
