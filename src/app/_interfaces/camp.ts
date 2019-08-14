import Timestamp = firebase.firestore.Timestamp;
import * as firebase from '../../../node_modules/firebase';

export class Camp {
  Group: string;
  AmountOfMembers: number;
  AmountOfLeaders: number;
  AmountOfHelpers: number;
  StartDate: Timestamp;
  StartTime: Timestamp;
  EndDate: Timestamp;
  EndTime: Timestamp;
  StreetName: string;
  HouseNumber: number;
  PostCode: number;
  City: string;
  CampId: number;
  userId: string;
}
