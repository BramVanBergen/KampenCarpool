import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Driver} from '../_interfaces/driver';
import {from, Observable, of, Subscription} from 'rxjs';
import {Camp} from '../_interfaces/camp';
import {CampService} from '../_services/camp.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styles: []
})
export class AddCampComponent implements OnInit, OnDestroy {

  camp: Camp;
  camp$: Observable<any>;
  private subscriptions: Subscription[] = [];

  constructor(private campService: CampService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.camp = new Camp();

    this.camp$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.campService.getCamp(params.get('id'));
        } else {
          return Observable.create();
        }
      })
    );

    this.subscriptions.push(this.camp$.subscribe(camp => {
      this.camp = camp[0];
    }));
  }

  addCamp(form) {
    this.campService.addCamp(form);
    this.router.navigate(['/camps']);
  }

  ngOnDestroy() {
    console.log(this.subscriptions);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
