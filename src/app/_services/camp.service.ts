import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Camp} from '../_interfaces/camp';
import {Observable} from 'rxjs';
import {User} from '../_interfaces/user';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {DriverService} from './driver.service';
import {Driver} from '../_interfaces/driver';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  private collection = 'Camps';

  user: User;
  camps$: Observable<any[]>;
  camp: any;
  data$: Observable<any>;
  counter: number;
  counter2: number;
  id: string;

  constructor(private afs: AngularFirestore, private campService: CampService, private router: Router, private authService: AuthService) {
    this.camps$ = this.afs.collection<Camp>(this.collection).valueChanges();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  getCamps() {
    return this.camps$;
  }

  getCamp(campId) {
    this.data$ = this.afs.collection(this.collection, ref => ref.where('CampId', '==', campId)).valueChanges();

    return this.data$;
  }

  addCamp(camp) {
    let key = camp.CampId;
    if (key === '' || key === undefined) {
      key = this.afs.createId();
    }
    const document = this.collection + '/' + key;
    this.afs.doc(document).set({
      Group: camp.Group,
      AmountOfMembers: camp.AmountOfMembers,
      AmountOfLeaders: camp.AmountOfLeaders,
      AmountOfHelpers: camp.AmountOfHelpers,
      StartDate: camp.StartDate,
      StartTime: camp.StartTime,
      EndDate: camp.EndDate,
      EndTime: camp.EndTime,
      StreetName: camp.StreetName,
      HouseNumber: camp.HouseNumber,
      PostCode: camp.PostCode,
      City: camp.City,
      CampId: key,
      userId: this.user.uid
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  deleteCamp(campId: string) {
    this.afs.collection<Camp>(this.collection, ref => ref.where('CampId', '==', campId)).valueChanges().subscribe(camps => {
      camps.forEach(camp => {
        if (this.user.uid === camp.userId || this.user.role === 'Admin') {
          this.afs.doc(this.collection + '/' + camp.CampId).delete().catch(error => console.error('Error deleting camp: ', error));
        } else {
          console.log('Verkeerde gebruiker');
        }
      });
    });

    this.getCamps();
  }
}
