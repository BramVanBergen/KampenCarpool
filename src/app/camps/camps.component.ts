import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {Camp} from '../_interfaces/camp';
import {CampService} from '../_services/camp.service';

@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styles: []
})
export class CampsComponent implements OnInit {

  camps$: Observable<any>;
  private sub: any;

  constructor(private campService: CampService) {}

  ngOnInit() {
    this.camps$ = this.campService.getCamps();

    this.sub = this.camps$.subscribe(results => {
      results.forEach(result => {
        console.log(result);
      });

      this.sub.unsubscribe();
    });
  }

}
