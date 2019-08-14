import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {CampService} from '../_services/camp.service';
import {DriverService} from '../_services/driver.service';
import {AlertBox} from '../_interfaces/alert-box';
import {Router} from '@angular/router';

@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styles: []
})
export class CampsComponent implements OnInit, OnDestroy {

  camps$: Observable<any>;
  private subscriptions: Subscription[] = [];

  constructor(private campService: CampService, private driverService: DriverService, private router: Router) {
  }

  ngOnInit() {
    this.camps$ = this.campService.getCamps();
    this.driverService.getFreePlacesBack('T1MNKLtdczWnJ6zmRc0u').subscribe(data => console.log(data));
  }

  checkForDrivers(campId) {
    this.subscriptions.push(this.driverService.checkIfCampHasDrivers(campId).subscribe(value => {
      if (value) {
        alert('Dit kamp heeft nog chauffeurs, gelieve deze eerst te verwijderen.');
      } else {
        this.deleteCamp(campId);
      }
    }));

  }

  editCamp(campId) {
    this.campService.getCamp(campId);
    this.router.navigate(['/editCamp', campId]);
  }

  deleteCamp(campId) {
    this.campService.deleteCamp(campId);
  }

  ngOnDestroy() {
    console.log(this.subscriptions);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
