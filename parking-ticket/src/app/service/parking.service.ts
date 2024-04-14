import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private http: HttpClient) { }

  apiUrl ="http://localhost:8080"

  createParkingSpace(data:any){
    return this.http.post(`${this.apiUrl}/parking/space/create`,data);
  }

  getAllParkingSpaces(){
    return this.http.get(`${this.apiUrl}/parking/space/fetchAll`);
  }

  getAllParkingSlots(parkingSpaceId:number){
    return this.http.get(`${this.apiUrl}/parking/slot/`+parkingSpaceId+"/fetchAll");
  }
  
  addNewParkingSlot(data:any,parkingSpaceId:number){
    return this.http.post(`${this.apiUrl}/parking/slot/` +parkingSpaceId +  "/create",data);
  }
  
  getParkingSpaceDetailsBySpaceId(parkingSpaceId:number){
    return this.http.get(`${this.apiUrl}/parking/slot/`+parkingSpaceId+"/fetch");
  }

  bookParkingSlot(data:any){
    return this.http.post(`${this.apiUrl}/parking/slot/book`,data,{withCredentials:true});
  }

  getBookingHistory(pageSize:number,pageNo:number){
    return this.http.get(`${this.apiUrl}/parking/booking/history?pageSize=`+pageSize + "&pageNo="+pageNo,{withCredentials:true});
  }

  getAllBookingHistoryCount(){
    return this.http.get(`${this.apiUrl}/parking/booking/history/count`,{withCredentials:true});
  }

  getBookedSlotDetails(parkingSpaceId:number,date:string){
    return this.http.get(`${this.apiUrl}/parking/slot/booked/`+parkingSpaceId + "?date="+date,{withCredentials:true});
  }
  
}
