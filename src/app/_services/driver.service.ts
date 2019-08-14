import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {User} from '../_interfaces/user';
import {Driver} from '../_interfaces/driver';
import {Camp} from '../_interfaces/camp';
import {CampService} from './camp.service';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Twilio} from 'twilio';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DriverService implements OnDestroy {

  constructor(private afs: AngularFirestore, private campService: CampService, private authService: AuthService, private http: HttpClient) {
    this.counter = 0;
    this.drivers_final = [];
    this.drivers$ = this.afs.collection<Driver>(this.collection).valueChanges().pipe(
      map(drivers => {
        drivers.forEach(driver => {
          this.getGroup(driver);
        });
        return drivers;
      }));
    this.subscriptions.push(this.authService.userData$.subscribe(data => this.user = data));
  }

  private collection = 'Drivers';
  private subscriptions: Subscription[] = [];
  user: User;
  drivers$: Observable<Driver[]>;
  drivers_final: Driver[];
  camp: Observable<Camp>;
  counter: number;

  getDriversWithGroup() {
    return this.drivers$;
  }

  getGroup(driver) {
    this.subscriptions.push(this.afs.collection('Camps', ref => ref.where('CampId', '==', driver.CampId))
      .valueChanges().subscribe(camp => {
        driver['GroupName'] = camp[0]['Group'];
      }));
    return driver;
  }

  addDriver(driver) {
    const key = this.afs.createId();
    const document = this.collection + '/' + key;
    this.afs.doc(document).set({
      CampId: driver.CampId,
      FirstName: driver.FirstName,
      LastName: driver.LastName,
      FirstNameChild: driver.FirstNameChild,
      LastNameChild: driver.LastNameChild,
      FreePlacesTo: driver.FreePlacesTo,
      FreePlacesBack: driver.FreePlacesBack,
      userId: this.user.uid,
      driverId: key
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  deleteDriverById(driverId: string) {
    this.subscriptions.push(this.afs.collection<Driver>(this.collection, ref => ref.where('driverId', '==', driverId))
      .valueChanges().subscribe(drivers => {
        drivers.forEach(driver => {
          if (this.user.uid === driver.userId || this.user.role === 'Admin') {
            this.afs.doc(this.collection + '/' + driver.driverId).delete().catch(error => console.error('Error deleting driver: ', error));
          } else {
            console.log('Verkeerde gebruiker');
          }
        });
      }));

    this.getDriversWithGroup();
  }

  checkIfCampHasDrivers(campId: string) {
    const subject = new Subject<boolean>();

    this.subscriptions.push(this.afs.collection<Driver>(this.collection).valueChanges().subscribe(drivers => {
      if (drivers.filter(driver => driver.CampId === campId).length === 0) {
        subject.next(false);
      } else {
        subject.next(true);
      }
    }));

    return subject;
  }

  getFreePlacesBack(campId: string) {
    const freePlacesBack = new Subject<number>();
    this.subscriptions.push(this.afs.collection<Driver>(this.collection, ref => ref.where('CampId', '==', campId))
      .valueChanges().subscribe(drivers => {
        freePlacesBack.next(0);
        let counter = 0;
        drivers.forEach(driver => {
          counter += driver.FreePlacesBack;
        });
        freePlacesBack.next(counter);
      }));
    console.log(freePlacesBack);
    return freePlacesBack;
  }

  getFreePlacesTo(campId: string) {
    let freePlacesTo = 0;
    this.subscriptions.push(this.afs.collection<Driver>(this.collection, ref => ref.where('CampId', '==', campId))
      .valueChanges().subscribe(drivers => {
        drivers.forEach(driver => {
          freePlacesTo += driver.FreePlacesTo;
        });
      }));
    return freePlacesTo;
  }

  ngOnDestroy() {
    console.log(this.subscriptions);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
