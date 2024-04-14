import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert-service.service';
import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent {

  bookingHistoryList : any[] = [];
  displayedColumns: string[] = ['id', 'Slot Id', 'Vehicle Type', 'Date of Booking'];
  pageSizeOptions: number[] = [2,4,6, 50, 100];
  pageSize: number = 2;
  pageNo: number = 0;
  pageEvent: any;

  constructor(private parkingService: ParkingService,private alertService : AlertService,private router : Router) {

  }

  ngOnInit() {
    this.getBookingHistory();
    this.getAllBookingHistoryCount();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;
    console.log(this.pageSize);
    console.log(this.pageNo);
    this.getBookingHistory();
    // You can fetch data for the new page here based on this.pageSize and this.pageIndex
    // For example, if you're using an API call to fetch data, you can trigger it here
    // this.fetchData();
  }

  getAllBookingHistoryCount(){
    this.parkingService.getAllBookingHistoryCount().subscribe(
      data=>{
        var obj:any= data
        this.pageSize = obj
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


  getBookingHistory(){
    this.parkingService.getBookingHistory(this.pageSize,this.pageNo).subscribe(
      data=>{
        var obj: any = data;
        this.bookingHistoryList = obj.data;
        console.log(this.bookingHistoryList);
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
}
