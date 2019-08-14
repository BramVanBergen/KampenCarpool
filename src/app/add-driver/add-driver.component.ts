import {Component, OnInit} from '@angular/core';
import {Driver} from '../_interfaces/driver';
import {CampService} from '../_services/camp.service';
import {Camp} from '../_interfaces/camp';
import {Observable} from 'rxjs';
import {DriverService} from '../_services/driver.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: []
})
export class AddDriverComponent implements OnInit {

  driver: Driver;
  camps$: Observable<Camp[]>;

  constructor(private campService: CampService, private driverService: DriverService, private router: Router) {
    this.camps$ = this.campService.getCamps();
  }

  ngOnInit() {
    this.driver = new Driver();
  }

  addDriver(form) {
    this.driverService.addDriver(form);
    this.router.navigate(['/drivers']);
  }

}
