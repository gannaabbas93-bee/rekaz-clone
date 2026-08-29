import { Component, inject, signal, computed, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { ApiService, HomeDataResponse } from '../../services/api.service';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface ServiceOption {
  id: number;
  nameAr: string;
  nameEn: string;
}

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss'
})
export class BookingFormComponent {
  readonly ts = inject(TranslationService);
  private apiService = inject(ApiService);
  private elementRef = inject(ElementRef);

  services: ServiceOption[] = [
    { id: 1, nameAr: 'إدارة الحجوزات', nameEn: 'Bookings Management' },
    { id: 2, nameAr: 'إدارة الاشتراكات', nameEn: 'Memberships Management' },
    { id: 3, nameAr: 'تقارير وأداء', nameEn: 'Reports & Analytics' },
    { id: 4, nameAr: 'دعم الدفع الإلكتروني', nameEn: 'Online Payments' }
  ];

  selectedServiceId = signal<number>(1);
  selectedDate = signal<string>('2026-08-30');

  availableSlots = signal<string[]>([]);
  selectedSlot = signal<string | null>(null);
  isCheckingSlots = signal<boolean>(false);
  slotsMessage = signal<string | null>(null);
  slotsError = signal<string | null>(null);
  hasSearchedSlots = signal<boolean>(false);

  countries: Country[] = [
    // Top 9 initial list matching screenshot
    { code: '+966', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
    { code: '+971', name: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png' },
    { code: '+973', name: 'Bahrain', flag: 'https://flagcdn.com/w40/bh.png' },
    { code: '+965', name: 'Kuwait', flag: 'https://flagcdn.com/w40/kw.png' },
    { code: '+968', name: 'Oman', flag: 'https://flagcdn.com/w40/om.png' },
    { code: '+974', name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png' },
    { code: '+20', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
    { code: '+962', name: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png' },
    { code: '+93', name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png' },

    // Additional global countries
    { code: '+213', name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
    { code: '+54', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
    { code: '+61', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
    { code: '+55', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
    { code: '+1', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
    { code: '+86', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
    { code: '+269', name: 'Comoros', flag: 'https://flagcdn.com/w40/km.png' },
    { code: '+253', name: 'Djibouti', flag: 'https://flagcdn.com/w40/dj.png' },
    { code: '+251', name: 'Ethiopia', flag: 'https://flagcdn.com/w40/et.png' },
    { code: '+33', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: '+49', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    { code: '+233', name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png' },
    { code: '+91', name: 'India', flag: 'https://flagcdn.com/w40/in.png' },
    { code: '+62', name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
    { code: '+964', name: 'Iraq', flag: 'https://flagcdn.com/w40/iq.png' },
    { code: '+39', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
    { code: '+81', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    { code: '+254', name: 'Kenya', flag: 'https://flagcdn.com/w40/ke.png' },
    { code: '+961', name: 'Lebanon', flag: 'https://flagcdn.com/w40/lb.png' },
    { code: '+218', name: 'Libya', flag: 'https://flagcdn.com/w40/ly.png' },
    { code: '+60', name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
    { code: '+222', name: 'Mauritania', flag: 'https://flagcdn.com/w40/mr.png' },
    { code: '+52', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
    { code: '+212', name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' },
    { code: '+31', name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
    { code: '+64', name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png' },
    { code: '+234', name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' },
    { code: '+92', name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png' },
    { code: '+970', name: 'Palestine', flag: 'https://flagcdn.com/w40/ps.png' },
    { code: '+63', name: 'Philippines', flag: 'https://flagcdn.com/w40/ph.png' },
    { code: '+7', name: 'Russia', flag: 'https://flagcdn.com/w40/ru.png' },
    { code: '+65', name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png' },
    { code: '+252', name: 'Somalia', flag: 'https://flagcdn.com/w40/so.png' },
    { code: '+27', name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' },
    { code: '+82', name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png' },
    { code: '+34', name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
    { code: '+249', name: 'Sudan', flag: 'https://flagcdn.com/w40/sd.png' },
    { code: '+46', name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },
    { code: '+41', name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' },
    { code: '+963', name: 'Syria', flag: 'https://flagcdn.com/w40/sy.png' },
    { code: '+216', name: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png' },
    { code: '+90', name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png' },
    { code: '+44', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: '+1', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
    { code: '+84', name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png' },
    { code: '+967', name: 'Yemen', flag: 'https://flagcdn.com/w40/ye.png' }
  ];

  selectedCountry = signal<Country>(this.countries[0]);
  isDropdownOpen = signal(false);
  openUpwards = signal(false);
  searchQuery = signal('');
  submitted = signal(false);
  isSuccess = signal(false);

  filteredCountries = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return this.countries;
    return this.countries.filter(c => 
      c.name.toLowerCase().includes(query) || c.code.includes(query)
    );
  });

  bookingForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    businessType: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,15}$')])
  });

  onServiceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedServiceId.set(Number(select.value));
    this.selectedSlot.set(null);
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate.set(input.value);
    this.selectedSlot.set(null);
  }

  checkAvailability(): void {
    this.isCheckingSlots.set(true);
    this.slotsError.set(null);
    this.hasSearchedSlots.set(true);

    this.apiService.getHomeData(this.selectedServiceId(), this.selectedDate()).subscribe({
      next: (res: HomeDataResponse) => {
        this.availableSlots.set(res.availableSlots);
        this.slotsMessage.set(
          this.ts.currentLang() === 'ar' 
            ? `المواعيد المتاحة بتاريخ ${this.selectedDate()}` 
            : `Available slots on ${this.selectedDate()}`
        );
        this.isCheckingSlots.set(false);
      },
      error: (err) => {
        console.error('Error fetching availability:', err);
        this.slotsError.set(this.ts.currentLang() === 'ar' 
          ? 'تعذر الاتصال بالخادم (.NET API /api/home)' 
          : 'Could not connect to .NET API');
        this.isCheckingSlots.set(false);
      }
    });
  }

  selectSlot(slot: string): void {
    this.selectedSlot.set(slot);
  }

  toggleDropdown(event: MouseEvent): void {
    if (event) event.stopPropagation();
    const nextState = !this.isDropdownOpen();
    if (nextState) {
      this.searchQuery.set('');
      const target = event.currentTarget as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        this.openUpwards.set(spaceBelow < 300);
      }
    }
    this.isDropdownOpen.set(nextState);
  }

  filterCountries(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectCountry(country: Country, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedCountry.set(country);
    this.isDropdownOpen.set(false);
    this.searchQuery.set('');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const phoneWrapper = this.elementRef.nativeElement.querySelector('.phone-prefix-wrapper');
    if (phoneWrapper && !phoneWrapper.contains(target)) {
      this.isDropdownOpen.set(false);
    }
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.bookingForm.invalid) {
      return;
    }

    this.isSuccess.set(true);
    setTimeout(() => {
      this.isSuccess.set(false);
      this.submitted.set(false);
      this.selectedSlot.set(null);
      this.bookingForm.reset();
    }, 4000);
  }
}

