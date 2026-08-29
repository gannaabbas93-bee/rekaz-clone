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

export interface AvailabilityResponse {
  serviceId: number;
  date: string;
  availableSlots: string[];
  messageAr: string;
  messageEn: string;
  serverTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5189/api';

  getHomeData(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>(`${this.baseUrl}/home`);
  }

  getAvailability(serviceId: number, date: string): Observable<AvailabilityResponse> {
    return this.http.get<AvailabilityResponse>(`${this.baseUrl}/availability`, {
      params: {
        serviceId: serviceId.toString(),
        date: date
      }
    });
  }
}

