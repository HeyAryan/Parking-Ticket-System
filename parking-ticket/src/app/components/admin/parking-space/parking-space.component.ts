import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent {
  optionsList = ["ABANDONED", "READY", "STAGED"];
  name: string = ''
  address: string = ''
  price: number = 0
  status: string = 'ACTIVE'
  parkingSpacesList:any=[];

  constructor(private parkingService:ParkingService,private router: Router){

  }

  ngOnInit(){
    this.getAllParkingSpaces();
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


  resetFields(){
    this.name = '';
    this.address = '';
    this.price = 0;
    this.status = 'ACTIVE';

  }

  createParkingSpace(){
    var parkingSpaceDto={
      name:this.name,
      address:this.address,
      price:this.price,
      status:this.status
    }
    console.log(parkingSpaceDto)
    this.parkingService.createParkingSpace(parkingSpaceDto).subscribe(
      data=>{
        console.log(data);
        this.resetFields();
        this.getAllParkingSpaces();
      },error=>{
        console.log(error)
      }
    )
  }


  openParkingSpace(parkingSpaceId:number){
    this.router.navigate(['/admin/parking/slot/' + parkingSpaceId]);
  }
}
