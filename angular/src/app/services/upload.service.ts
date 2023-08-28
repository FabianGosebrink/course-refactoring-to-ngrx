import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly http = inject(HttpService);

  upload(formData: FormData) {
    return this.http.post<{ path: string }>(
      `${environment.server}api/upload/image`,
      formData
    );
  }
}
