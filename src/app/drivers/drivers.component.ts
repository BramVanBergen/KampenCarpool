import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DriverService} from '../_services/driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styles: []
})
export class DriversComponent implements OnInit {

  drivers: Observable<any[]>;

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.drivers = this.driverService.getDriversWithGroup();
  }

  deleteDriver(driverId) {
    this.driverService.deleteDriverById(driverId);
  }
}
