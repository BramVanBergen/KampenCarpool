import Timestamp = firebase.firestore.Timestamp;
import * as firebase from '../../../node_modules/firebase';

export class Camp {
  tak: string;
  aantalLeden: number;
  aantalLeiding: number;
  aantalFoeriers: number;
  startDatum: Timestamp;
  eindDatum: Timestamp;
  straatNaam: string;
  huisnummer: number;
  postcode: number;
  gemeente: string;
}
