import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {Camp} from '../_interfaces/camp';
import {Observable} from 'rxjs';
import {User} from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  private collection = 'Scoutsjaar';

  user: User;
  camps$: Observable<Camp[]>;

  constructor(private afs: AngularFirestore) {
    this.camps$ = this.afs.collection<Camp>(this.collection).valueChanges();
    // console.log(this.afs.doc('Scoutsjaar/aKZSpV59gxyazPHaDe0x').valueChanges());
  }

  getCamps() {
    return this.camps$;
  }

  addCamp(camp) {
    const key = this.afs.createId();
    const document = this.collection + '/' + key;
    this.afs.doc(document).set({
      tak: camp.tak,
      aantalLeden: camp.aantalLeden,
      aantalLeiding: camp.aantalLeiding,
      aantalFoeriers: camp.aantalFoeriers,
      startDatum: camp.startDatum,
      eindDatum: camp.eindDatum,
      straatNaam: camp.straatNaam,
      huisnummer: camp.huisnummer,
      postcode: camp.postcode,
      gemeente: camp.gemeente
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  deleteCamp(id) {
    var campSubscription = this.afs.collection<any>(this.collection, ref => ref.where('campId', '==', id)).valueChanges().subscribe(campCollection => {
      campCollection.forEach(camp => {
        if (this.user.uid == camp.userId) {
          const path = this.collection + '/' + camp.key;
          this.afs.doc(path).delete().catch(
            error => console.error('Error deleting camp: ', error)
          );
        }
      });
    });
    campSubscription.unsubscribe();
  }
}
