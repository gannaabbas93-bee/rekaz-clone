import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
}

export interface HomeResponse {
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  services: ServiceItem[];
  serverTime: string;
  backendVersion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5189/api/home';

  getHomeData(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>(this.apiUrl);
  }
}
