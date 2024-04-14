import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert-service.service';

import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-user-parking-slots',
  templateUrl: './user-parking-slots.component.html',
  styleUrls: ['./user-parking-slots.component.css']
})
export class UserParkingSlotsComponent {
  parkingSpaceId:number;
  parkingSlotsList:any[]=[];
  selectedSlotsName:string=""
  selectedSlotsCount:number=0
  selectSlotsAmount:number=0
  parkingSpaceDetails:any
  selectedSlotsList:any[]

  totalSlots:number = 0
  availableSlots:number = 0
  yourBookedSlots:number = 0

  constructor(private service: ParkingService,private route : ActivatedRoute,private alertService: AlertService,private router: Router){
    let id = this.route.snapshot.paramMap.get('parkingSpaceId');
    if(id != undefined && id!=null){
      this.parkingSpaceId = Number(id);;
    }
  }

  
  ngOnInit() {
    this.fetchAllParkingSlotsByParkingSpaceId();
    this.getParkingSpaceDetails();
    this.getExistingBookingDetails();
  }


  getExistingBookingDetails(){
    this.service.getBookedSlotDetails(this.parkingSpaceId,this.getCurrentDate()).subscribe(
      data=>{
        var obj :any = data
        console.log(obj)
        this.yourBookedSlots = obj.data.length
        this.parkingSlotsList.forEach(slot => {
          obj.data.forEach((booked: any) =>{
            if(slot.id == booked.parkingSlotId){
              slot.bookedByActiveUser = true;
            }
          })
        });
        console.log(this.parkingSlotsList)
      },error=>{
        if(error.error.status == 401){
          this.alertService.showAlert(error.error.message,"error");
          this.router.navigate(['/user/login']);
        }else{
          this.alertService.showAlert(error.error.message,"error");
        }
      }
    )
  }

  redirectToBookingHistory(){
    this.router.navigate(['/user/booking/history'])
  }
  getParkingSpaceDetails(){
    this.service.getParkingSpaceDetailsBySpaceId(this.parkingSpaceId).subscribe(
      data=>{
        var obj:any = data
        this.parkingSpaceDetails = obj.data
      },error=>{
        if(error.error.status == 401){
          this.alertService.showAlert(error.error.message,"error");
          this.router.navigate(['/user/login']);
        }else{
          this.alertService.showAlert(error.error.message,"error");
        }
      }
    )
  }

  bookParkingSlot(){
    var parkingIds :any = [];
    this.selectedSlotsList.forEach(slot => {
      console.log(slot);
      parkingIds.push(slot.id)
    })
    var bookingDto={
      parkingSlotIds: parkingIds,
      parkingSpaceId: this.parkingSpaceId,
      date: this.getCurrentDate(),
      checkInTime:null,
      checkOutTime:null
    }

    this.service.bookParkingSlot(bookingDto).subscribe(
      data=>{
        this.fetchAllParkingSlotsByParkingSpaceId();
        this.getExistingBookingDetails();
        this.alertService.showAlert("Parking slot booked successfully!!!","success");
      },error=>{
        console.log(error);
        if(error.error.status == 401){
          this.alertService.showAlert(error.error.message,"error");
          this.router.navigate(['/user/login']);
        }else{
          this.alertService.showAlert(error.error.message,"error");
        }
      }
    )
  }


  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because January is 0
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  selectSlot(slotId:number){
    console.log(slotId);
    this.selectedSlotsName=""
    this.selectedSlotsCount=0
    this.selectSlotsAmount=0
    this.selectedSlotsList=[];
    this.parkingSlotsList.forEach(slot => {
      if(slot.id == slotId){
        slot.isSelected = !slot.isSelected;
      }
      if(slot.isSelected){
        this.selectedSlotsName = this.selectedSlotsName + slot.slotId + ",";
        this.selectedSlotsCount = this.selectedSlotsCount + 1;
        this.selectSlotsAmount = this.selectSlotsAmount + this.parkingSpaceDetails.price;
        this.selectedSlotsList.push(slot)
      }
    })
    this.selectedSlotsName = this.selectedSlotsName.substring(0,this.selectedSlotsName.length-1)
  }

  fetchAllParkingSlotsByParkingSpaceId(){
    this.service.getAllParkingSlots(this.parkingSpaceId).subscribe(
      data=>{
        console.log(data);
        var obj : any = data
        this.totalSlots = obj.data.length
        this.parkingSlotsList = obj.data;
        var bookedSlotCount = 0;
        this.parkingSlotsList.forEach(slot => {
            slot.isSelected = false;
            if(slot.isBooked){
              bookedSlotCount = bookedSlotCount + 1
            }
        })
        this.availableSlots = this.totalSlots - bookedSlotCount
      },error=>{
        console.log(error)
      }
    )
  }

  
  getCardStyle(status: string,isSelected:Boolean,slotBooked:boolean,isBookedByUser:boolean): object {
    let backgroundColor: string;
    let color: string;

    if(slotBooked){
      if(isBookedByUser){
        backgroundColor = '#24be24';
        color = 'white';
        return {
          'background': backgroundColor,
          'color': color
        };
      }else{
        backgroundColor = '#aca8a8';
        color = 'white';
        return {
          'background': backgroundColor,
          'color': color
        };
      }
    }else{
      if(isSelected){
        backgroundColor = 'skyblue';
        color = 'white';
        return {
          'background': backgroundColor,
          'color': color
        };
      }else{
        switch (status) {
          case 'ACTIVE':
            backgroundColor = 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))';
            color = 'white';
            break;
          case 'ABANDONED':
            backgroundColor= 'linear-gradient(25deg, rgb(214, 76, 127), rgb(238, 71, 88) 50%)';
            color = 'white';
            break;
          case 'INACTIVE':
            backgroundColor= 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)';
            color = 'black';
            break;
          default:
            backgroundColor = 'white';
            color = 'black';
            break;
        }
        return {
          'background': backgroundColor,
          'color': color
        };
      }
    }

  }

}
