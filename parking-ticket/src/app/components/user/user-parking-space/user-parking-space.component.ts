import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-user-parking-space',
  templateUrl: './user-parking-space.component.html',
  styleUrls: ['./user-parking-space.component.css']
})
export class UserParkingSpaceComponent {
  parkingSpacesList:any[]=[]

  constructor(private parkingService:ParkingService,private router: Router){

  }

  ngOnInit(){
    this.getAllParkingSpaces();
  }


  redirectToBookingHistory(){
    this.router.navigate(['/user/booking/history'])
  }

  getAllParkingSpaces(){
    this.parkingService.getAllParkingSpaces().subscribe(
      data =>{
        var obj :any= data;
        this.parkingSpacesList = obj.data
      },error=>{

      }
      )
  }

  openParkingSpace(parkingSpaceId:number){
    console.log(parkingSpaceId);
    this.router.navigate(['/user/parking/space/' + parkingSpaceId]);
  }
}
