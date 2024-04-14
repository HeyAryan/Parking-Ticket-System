import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.css']
})
export class ParkingSlotComponent {
  parkingSpaceId: number
  parkingSlotsList:any[]=[]
  status:string='ACTIVE'
  vehicleType:string='CAR'

  constructor(private route: ActivatedRoute,private service:ParkingService){
    let id = this.route.snapshot.paramMap.get('parkingSpaceId');
    if(id != undefined && id!=null){
      this.parkingSpaceId = Number(id);;
    }
  }
  ngOnInit() {
    this.fetchAllParkingSlotsByParkingSpaceId();
  }


  fetchAllParkingSlotsByParkingSpaceId(){
    this.service.getAllParkingSlots(this.parkingSpaceId).subscribe(
      data=>{
        console.log(data);
        var obj : any = data
        this.parkingSlotsList = obj.data;
      },error=>{
        console.log(error)
      }
    )
  }

  addNewSlot(){
    let parkingSlotDto={
      status:this.status,
      vehicleType: this.vehicleType
    };
    this.service.addNewParkingSlot(parkingSlotDto,this.parkingSpaceId).subscribe(
      data=>{
        this.fetchAllParkingSlotsByParkingSpaceId();
      },error=>{
        console.log(error);
      }
    )
  }
  getCardStyle(status: string): object {
    let backgroundColor: string;
    let color: string;
  
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
