import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { BookingFormComponent } from '../../components/booking-form/booking-form';
import { IndustriesGridComponent } from '../../components/industries-grid/industries-grid';
import { WhatsappButton } from '../../components/whatsapp-button/whatsapp-button';
import { FloatingVideoCard } from '../../components/floating-video-card/floating-video-card';
import { ApiService, HomeResponse } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [
    CommonModule,
    Navbar,
    HeroComponent,
    BookingFormComponent,
    IndustriesGridComponent,
    WhatsappButton,
    FloatingVideoCard
  ],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private apiService = inject(ApiService);
  readonly ts = inject(TranslationService);

  homeData = signal<HomeResponse | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchBackendData();
  }

  fetchBackendData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.apiService.getHomeData().subscribe({
      next: (data) => {
        this.homeData.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching backend data:', err);
        this.error.set('تعذر الاتصال بالخادم الخلفي (.NET Backend API)');
        this.isLoading.set(false);
      }
    });
  }

  get currentTitle(): string {
    const data = this.homeData();
    if (!data) return 'أهلاً بك في ركاز';
    return this.ts.currentLang() === 'ar' ? data.titleAr : data.titleEn;
  }

  get currentMessage(): string {
    const data = this.homeData();
    if (!data) return 'منصة إدارة الحجوزات والاشتراكات الذكية';
    return this.ts.currentLang() === 'ar' ? data.messageAr : data.messageEn;
  }
}

