import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }


  showAlert(message:string,type:string){
    switch(type){
      case 'success':
          this.showSuccessAlert(message);
          break;
      case 'error':
          this.showErrorAlert(message);
          break;
      case 'info':
          this.showInfoAlert(message);
    }
  }

  showSuccessAlert(message: string) {
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['success-snackbar'];
      this.snackBar.open(message,undefined,config);
  }
  showErrorAlert(message:string){
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['error-snackbar'];
      this.snackBar.open(message,undefined,config);
  }
  showInfoAlert(message:string){
      const config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['info-snackbar'];
      this.snackBar.open(message,undefined,config);
  }

}
