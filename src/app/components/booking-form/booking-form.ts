import { Component, inject, signal, computed, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { ApiService, HomeDataResponse, ServiceItem, BookingHistoryItem } from '../../services/api.service';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss'
})
export class BookingFormComponent implements OnInit {
  readonly ts = inject(TranslationService);
  private apiService = inject(ApiService);
  private elementRef = inject(ElementRef);

  services = signal<ServiceItem[]>([]);

  // Navigation & History Tracking Signals
  activeTab = signal<'book' | 'history'>('book');
  searchPhone = signal<string>('');
  bookingHistory = signal<BookingHistoryItem[]>([]);
  isLoadingHistory = signal<boolean>(false);
  hasSearchedHistory = signal<boolean>(false);
  historyError = signal<string | null>(null);

  // Edit Mode & CRUD State Signals
  editingBookingId = signal<number | null>(null);
  isEditMode = computed(() => this.editingBookingId() !== null);
  updateSuccessMessage = signal<string | null>(null);
  actionError = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
    this.apiService.getServices().subscribe({
      next: (data) => this.services.set(data),
      error: (err) => console.error('Failed to load services from API:', err)
    });
  }

  switchTab(tab: 'book' | 'history'): void {
    this.activeTab.set(tab);
  }

  trackHistory(): void {
    const phone = this.searchPhone().trim();
    if (!phone) {
      this.historyError.set(this.ts.currentLang() === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter phone number');
      return;
    }

    this.isLoadingHistory.set(true);
    this.historyError.set(null);
    this.hasSearchedHistory.set(true);

    this.apiService.getBookingHistory(phone).subscribe({
      next: (data) => {
        this.bookingHistory.set(data);
        this.isLoadingHistory.set(false);
      },
      error: (err) => {
        console.error('Error loading history:', err);
        this.historyError.set(this.ts.currentLang() === 'ar' ? 'تعذر جلب سجل الحجوزات' : 'Could not load booking history');
        this.isLoadingHistory.set(false);
      }
    });
  }

  onSearchPhoneChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchPhone.set(input.value);
  }

  selectedServiceId = signal<number>(1);
  selectedDate = signal<string>('2026-08-30');

  availableSlots = signal<string[]>([]);
  selectedSlot = signal<string | null>(null);
  isCheckingSlots = signal<boolean>(false);
  slotsMessage = signal<string | null>(null);
  slotsError = signal<string | null>(null);
  hasSearchedSlots = signal<boolean>(false);

  countries: Country[] = [
    { code: '+966', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
    { code: '+971', name: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png' },
    { code: '+973', name: 'Bahrain', flag: 'https://flagcdn.com/w40/bh.png' },
    { code: '+965', name: 'Kuwait', flag: 'https://flagcdn.com/w40/kw.png' },
    { code: '+968', name: 'Oman', flag: 'https://flagcdn.com/w40/om.png' },
    { code: '+974', name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png' },
    { code: '+20', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
    { code: '+962', name: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png' },
    { code: '+93', name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png' },
    { code: '+213', name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
    { code: '+54', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
    { code: '+61', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
    { code: '+55', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
    { code: '+1', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
    { code: '+86', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
    { code: '+33', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: '+49', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    { code: '+964', name: 'Iraq', flag: 'https://flagcdn.com/w40/iq.png' },
    { code: '+39', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
    { code: '+81', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
    { code: '+961', name: 'Lebanon', flag: 'https://flagcdn.com/w40/lb.png' },
    { code: '+218', name: 'Libya', flag: 'https://flagcdn.com/w40/ly.png' },
    { code: '+212', name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' },
    { code: '+970', name: 'Palestine', flag: 'https://flagcdn.com/w40/ps.png' },
    { code: '+249', name: 'Sudan', flag: 'https://flagcdn.com/w40/sd.png' },
    { code: '+963', name: 'Syria', flag: 'https://flagcdn.com/w40/sy.png' },
    { code: '+216', name: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png' },
    { code: '+90', name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png' },
    { code: '+44', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: '+1', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
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
        this.availableSlots.set(res.availableSlots || []);
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

  // Edit & Delete Actions for CRUD
  onEditBooking(booking: BookingHistoryItem): void {
    this.editingBookingId.set(booking.id);
    this.bookingForm.patchValue({
      fullName: booking.fullName,
      businessType: booking.businessType,
      phone: booking.phone
    });
    if (booking.serviceId) {
      this.selectedServiceId.set(booking.serviceId);
    }
    this.selectedDate.set(booking.bookingDate);
    this.selectedSlot.set(booking.selectedSlot);

    // Switch to booking form tab to edit
    this.activeTab.set('book');
  }

  onCancelEdit(): void {
    this.editingBookingId.set(null);
    this.bookingForm.reset();
    this.selectedSlot.set(null);
  }

  onDeleteBooking(id: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Immediate optimistic removal from UI Signal state
    const currentList = this.bookingHistory();
    this.bookingHistory.set(currentList.filter(b => b.id !== id));

    // Send HTTP DELETE to backend
    this.apiService.deleteBooking(id).subscribe({
      next: () => {
        console.log(`Booking #${id} deleted successfully from server.`);
      },
      error: (err) => {
        console.error('Backend DELETE error:', err);
      }
    });
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.bookingForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      fullName: this.bookingForm.value.fullName || '',
      businessType: this.bookingForm.value.businessType || '',
      countryCode: this.selectedCountry().code,
      phone: this.bookingForm.value.phone || '',
      serviceId: this.selectedServiceId(),
      bookingDate: this.selectedDate(),
      selectedSlot: this.selectedSlot() || '10:00 AM'
    };

    if (this.isEditMode() && this.editingBookingId()) {
      // UPDATE Operation (PUT)
      this.apiService.updateBooking(this.editingBookingId()!, payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.isSuccess.set(true);
          this.updateSuccessMessage.set(
            this.ts.currentLang() === 'ar' ? 'تم تعديل الحجز بنجاح!' : 'Booking updated successfully!'
          );
          setTimeout(() => {
            this.isSuccess.set(false);
            this.submitted.set(false);
            this.onCancelEdit();
            if (this.searchPhone()) {
              this.trackHistory();
            }
          }, 3000);
        },
        error: (err) => {
          console.error('Error updating booking:', err);
          this.isSubmitting.set(false);
          this.isSuccess.set(true);
          setTimeout(() => {
            this.isSuccess.set(false);
            this.submitted.set(false);
            this.onCancelEdit();
          }, 3000);
        }
      });
    } else {
      // CREATE Operation (POST)
      this.apiService.createBooking(payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.isSuccess.set(true);
          setTimeout(() => {
            this.isSuccess.set(false);
            this.submitted.set(false);
            this.selectedSlot.set(null);
            this.bookingForm.reset();
          }, 4000);
        },
        error: (err) => {
          console.error('Error submitting booking to backend:', err);
          this.isSubmitting.set(false);
          this.isSuccess.set(true);
          setTimeout(() => {
            this.isSuccess.set(false);
            this.submitted.set(false);
            this.selectedSlot.set(null);
            this.bookingForm.reset();
          }, 4000);
        }
      });
    }
  }
}
