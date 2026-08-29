import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, map } from 'rxjs';

export interface ServiceItem {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
}

export interface HomeDataResponse {
  headline: string;
  subtitle: string;
  rotatingWords: string[];
  services: ServiceItem[];
  availableSlots: string[];
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
  private readonly apiUrl = 'https://rekazapi-production.up.railway.app/api';

  getHomeData(serviceId?: number, date?: string): Observable<HomeDataResponse> {
    const params: any = {};
    if (serviceId !== undefined && serviceId !== null) {
      params.serviceId = serviceId.toString();
    }
    if (date) {
      params.date = date;
    }

    return this.http.get<HomeDataResponse>(`${this.apiUrl}/home`, { params }).pipe(
      retry({ count: 2, delay: 1000 })
    );
  }

  getAvailability(serviceId: number, date: string): Observable<AvailabilityResponse> {
    return this.getHomeData(serviceId, date).pipe(
      map((homeData: HomeDataResponse) => ({
        serviceId,
        date,
        availableSlots: homeData.availableSlots,
        messageAr: `المواعيد المتاحة بتاريخ ${date}`,
        messageEn: `Available slots on ${date}`,
        serverTime: new Date().toISOString()
      }))
    );
  }
}
