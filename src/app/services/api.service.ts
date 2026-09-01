import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, map, catchError } from 'rxjs';

export interface ServiceItem {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
}

export interface HomeDataResponse {
  headline?: string;
  subtitle?: string;
  messageAr?: string;
  messageEn?: string;
  rotatingWords?: string[];
  services: ServiceItem[];
  availableSlots?: string[];
}

export interface AvailabilityResponse {
  serviceId: number;
  date: string;
  availableSlots: string[];
  messageAr: string;
  messageEn: string;
  serverTime: string;
}

export interface BookingHistoryItem {
  id: number;
  fullName: string;
  businessType: string;
  serviceNameAr: string;
  serviceNameEn: string;
  serviceIcon: string;
  bookingDate: string;
  selectedSlot: string;
  createdAt: string;
}

export interface CreateBookingPayload {
  fullName: string;
  businessType: string;
  countryCode: string;
  phone: string;
  serviceId: number;
  bookingDate: string;
  selectedSlot: string;
}

export interface BookingResponse {
  id: number;
  fullName: string;
  serviceId: number;
  bookingDate: string;
  selectedSlot: string;
  messageAr: string;
  messageEn: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://rekazapi-production.up.railway.app/api';
  private readonly localApiUrl = 'http://localhost:5189/api';

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.localApiUrl}/services`).pipe(
      retry({ count: 1, delay: 500 }),
      catchError(() => this.http.get<ServiceItem[]>(`${this.apiUrl}/services`)),
      catchError(() => this.getHomeData().pipe(map(res => res.services)))
    );
  }

  getHomeData(serviceId?: number, date?: string): Observable<HomeDataResponse> {
    const params: any = {};
    if (serviceId !== undefined && serviceId !== null) {
      params.serviceId = serviceId.toString();
    }
    if (date) {
      params.date = date;
    }

    return this.http.get<HomeDataResponse>(`${this.localApiUrl}/home`, { params }).pipe(
      catchError(() => this.http.get<HomeDataResponse>(`${this.apiUrl}/home`, { params }))
    );
  }

  getAvailability(serviceId: number, date: string): Observable<AvailabilityResponse> {
    return this.getHomeData(serviceId, date).pipe(
      map((homeData: HomeDataResponse) => ({
        serviceId,
        date,
        availableSlots: homeData.availableSlots || [],
        messageAr: `المواعيد المتاحة بتاريخ ${date}`,
        messageEn: `Available slots on ${date}`,
        serverTime: new Date().toISOString()
      }))
    );
  }

  createBooking(payload: CreateBookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.localApiUrl}/bookings`, payload).pipe(
      retry({ count: 1, delay: 500 }),
      catchError(() => this.http.post<BookingResponse>(`${this.apiUrl}/bookings`, payload))
    );
  }

  getBookingHistory(phone: string): Observable<BookingHistoryItem[]> {
    return this.http.get<BookingHistoryItem[]>(`${this.localApiUrl}/bookings/history`, { params: { phone } }).pipe(
      retry({ count: 1, delay: 500 }),
      catchError(() => this.http.get<BookingHistoryItem[]>(`${this.apiUrl}/bookings/history`, { params: { phone } }))
    );
  }
}
