import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  token: string;
  expiresAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly localApiUrl = 'http://localhost:5189/api/auth';
  private readonly prodApiUrl = 'https://rekazapi-production.up.railway.app/api/auth';

  currentUser = signal<AuthUser | null>(this.getStoredUser());
  isLoggedIn = computed(() => !!this.currentUser());
  userName = computed(() => this.currentUser()?.fullName || '');
  userRole = computed(() => this.currentUser()?.role || '');

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.localApiUrl}/login`, payload).pipe(
      catchError(() => this.http.post<AuthUser>(`${this.prodApiUrl}/login`, payload)),
      tap(user => this.setSession(user))
    );
  }

  register(payload: RegisterPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.localApiUrl}/register`, payload).pipe(
      catchError(() => this.http.post<AuthUser>(`${this.prodApiUrl}/register`, payload)),
      tap(user => this.setSession(user))
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rekaz_user_session');
    }
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  private setSession(user: AuthUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rekaz_user_session', JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  private getStoredUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem('rekaz_user_session');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
