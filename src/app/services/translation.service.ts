import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'ar';

export interface Translations {
  navbar: {
    home: string;
    pricing: string;
    contact: string;
    login: string;
    startFree: string;
    langBtn: string;
    langName: string;
  };
  hero: {
    badgeBookings: string;
    badgeRevenue: string;
    headlinePrefix: string;
    words: string[];
    description: string;
    tryRekaz: string;
    trustBusinesses: string;
    score: string;
    noCommission: string;
  };
  bookingForm: {
    title: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    businessTypeLabel: string;
    businessTypePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submitButton: string;
    rating: string;
    clientsCount: string;
    nameRequired: string;
    businessTypeRequired: string;
    phoneRequired: string;
    phoneInvalid: string;
  };
}

const DICTIONARY: Record<Language, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      pricing: 'Pricing',
      contact: 'Contact',
      login: 'Login',
      startFree: 'Start Free',
      langBtn: 'ع',
      langName: 'ع (العربية)'
    },
    hero: {
      badgeBookings: '+320 bookings today',
      badgeRevenue: 'Monthly revenue ↑ 34%',
      headlinePrefix: 'Zero Hassle',
      words: ['Bookings', 'Memberships'],
      description: 'Rekaz booking and membership system gives you a branded site, online payments, WhatsApp automation, and performance reporting.',
      tryRekaz: 'Try Rekaz',
      trustBusinesses: '30,000+ businesses across the Gulf use Rekaz',
      score: '4.9',
      noCommission: 'No commission'
    },
    bookingForm: {
      title: 'Book a Free Meeting',
      subtitle: 'Get in touch and let us help you grow your business with Rekaz',
      fullNameLabel: 'Full name',
      fullNamePlaceholder: 'Enter your name',
      businessTypeLabel: 'Business type',
      businessTypePlaceholder: 'Enter your business type',
      phoneLabel: 'Phone number',
      phonePlaceholder: '',
      submitButton: 'Book a meeting',
      rating: '4.9/5',
      clientsCount: '1000+ clients',
      nameRequired: 'Please enter your name',
      businessTypeRequired: 'Please enter your business type',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Please enter a valid phone number'
    }
  },
  ar: {
    navbar: {
      home: 'الرئيسية',
      pricing: 'الأسعار',
      contact: 'تواصل معنا',
      login: 'تسجيل الدخول',
      startFree: 'ابدأ مجاناً',
      langBtn: 'EN',
      langName: 'EN (English)'
    },
    hero: {
      badgeBookings: '+320 حجز اليوم',
      badgeRevenue: 'الإيرادات الشهرية ↑ 34%',
      headlinePrefix: 'بدون عناء في',
      words: ['الحجوزات', 'الاشتراكات'],
      description: 'نظام ركاز للحجوزات والاشتراكات يمنحك موقعاً بهويتك، ومدفوعات عبر الإنترنت، وأتمتة واتساب، وتقارير الأداء.',
      tryRekaz: 'جرب ركاز',
      trustBusinesses: 'أكثر من 30,000 شركة عبر الخليج تستخدم ركاز',
      score: '4.9',
      noCommission: 'بدون عمولة'
    },
    bookingForm: {
      title: 'احجز اجتماعاً مجانياً',
      subtitle: 'تواصل معنا ودعنا نساعدك في تنمية أعمالك مع ركاز',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'أدخل اسمك',
      businessTypeLabel: 'نوع النشاط التجاري',
      businessTypePlaceholder: 'أدخل نوع نشاطك التجاري',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: '',
      submitButton: 'احجز موعدك الآن',
      rating: '4.9/5',
      clientsCount: 'أكثر من 1000 عميل',
      nameRequired: 'يرجى إدخال اسمك',
      businessTypeRequired: 'يرجى إدخال نوع النشاط التجاري',
      phoneRequired: 'رقم الهاتف مطلوب',
      phoneInvalid: 'يرجى إدخال رقم هاتف صحيح'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly currentLang = signal<Language>('en');
  readonly t = computed(() => DICTIONARY[this.currentLang()]);

  toggleLanguage(): void {
    const nextLang: Language = this.currentLang() === 'en' ? 'ar' : 'en';
    this.currentLang.set(nextLang);
    this.updateDocumentAttributes(nextLang);
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    this.updateDocumentAttributes(lang);
  }

  private updateDocumentAttributes(lang: Language): void {
    if (typeof document !== 'undefined') {
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', lang);
    }
  }
}
