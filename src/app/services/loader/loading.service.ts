import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(public loadingController: LoadingController) {}

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Laster spill ...',
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
