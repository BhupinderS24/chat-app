import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  errorHandler(err) {
    if (err.error) {
      this.toastr.error(err.error.error, err.error.status, {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('Something went wrong', 'Error', {
        timeOut: 3000,
      });
    }
  }
}
