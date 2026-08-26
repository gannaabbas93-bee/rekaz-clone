import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';

export type IndustryKey = 
  | 'gyms'
  | 'studios'
  | 'carWash'
  | 'techHubs'
  | 'realEstate'
  | 'clinics'
  | 'salons'
  | 'travel'
  | 'surfClubs'
  | 'kidsCenters'
  | 'entertainment'
  | 'hospitality';

export interface IndustryItem {
  key: IndustryKey;
  iconSvg: SafeHtml;
}

@Component({
  selector: 'app-industries-grid',
  standalone: true,
  imports: [],
  templateUrl: './industries-grid.html',
  styleUrl: './industries-grid.scss'
})
export class IndustriesGridComponent {
  readonly ts = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);

  getItemName(key: IndustryKey): string {
    const items = this.ts.t().industriesGrid.items;
    return items[key] || '';
  }

  industries: IndustryItem[] = [
    {
      key: 'gyms',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="gymGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#EF5050"/>
              <stop offset="100%" stop-color="#991B1B"/>
            </linearGradient>
            <linearGradient id="gymGrad2" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F87171"/>
              <stop offset="100%" stop-color="#DC2626"/>
            </linearGradient>
          </defs>
          <rect x="8" y="24" width="10" height="16" rx="4" fill="url(#gymGrad1)"/>
          <rect x="46" y="24" width="10" height="16" rx="4" fill="url(#gymGrad1)"/>
          <rect x="18" y="20" width="8" height="24" rx="4" fill="url(#gymGrad2)"/>
          <rect x="38" y="20" width="8" height="24" rx="4" fill="url(#gymGrad2)"/>
          <rect x="26" y="29" width="12" height="6" rx="3" fill="#475467"/>
          <circle cx="13" cy="32" r="2" fill="#FFFFFF" opacity="0.6"/>
          <circle cx="51" cy="32" r="2" fill="#FFFFFF" opacity="0.6"/>
        </svg>
      `)
    },
    {
      key: 'studios',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="stdGrad1" x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#6366F1"/>
              <stop offset="100%" stop-color="#312E81"/>
            </linearGradient>
          </defs>
          <rect x="10" y="20" width="44" height="30" rx="8" fill="url(#stdGrad1)"/>
          <path d="M22 20L25 14H39L42 20H22Z" fill="#4f46e5"/>
          <circle cx="32" cy="35" r="10" fill="#1E1B4B"/>
          <circle cx="32" cy="35" r="7" fill="#818CF8"/>
          <circle cx="30" cy="33" r="2.5" fill="#FFFFFF"/>
          <circle cx="46" cy="26" r="2.5" fill="#F43F5E"/>
        </svg>
      `)
    },
    {
      key: 'carWash',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="cwGrad1" x1="8" y1="16" x2="56" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#3B82F6"/>
              <stop offset="100%" stop-color="#1D4ED8"/>
            </linearGradient>
          </defs>
          <path d="M12 36L18 24C19.5 21 22 20 26 20H38C42 20 44.5 21 46 24L52 36V44C52 46.2 50.2 48 48 48H16C13.8 48 12 46.2 12 44V36Z" fill="url(#cwGrad1)"/>
          <circle cx="20" cy="44" r="4" fill="#1E293B"/>
          <circle cx="44" cy="44" r="4" fill="#1E293B"/>
          <path d="M20 25H44L47 33H17L20 25Z" fill="#93C5FD" opacity="0.8"/>
          <circle cx="22" cy="14" r="3" fill="#60A5FA"/>
          <circle cx="32" cy="11" r="4" fill="#93C5FD"/>
          <circle cx="42" cy="15" r="2.5" fill="#3B82F6"/>
        </svg>
      `)
    },
    {
      key: 'techHubs',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="thGrad1" x1="12" y1="12" x2="52" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#0EA5E9"/>
              <stop offset="100%" stop-color="#0369A1"/>
            </linearGradient>
          </defs>
          <rect x="14" y="16" width="36" height="24" rx="4" fill="url(#thGrad1)"/>
          <rect x="17" y="19" width="30" height="18" rx="2" fill="#0F172A"/>
          <path d="M8 44C8 41.8 9.8 40 12 40H52C54.2 40 56 41.8 56 44V46H8V44Z" fill="#64748B"/>
          <path d="M26 25L30 28L26 31" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
          <line x1="32" y1="31" x2="38" y2="31" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `)
    },
    {
      key: 'realEstate',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="reGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#B45309"/>
            </linearGradient>
          </defs>
          <rect x="16" y="20" width="32" height="32" rx="4" fill="url(#reGrad1)"/>
          <path d="M12 24L32 10L52 24H12Z" fill="#D97706"/>
          <rect x="22" y="26" width="6" height="6" rx="1" fill="#FEF3C7"/>
          <rect x="36" y="26" width="6" height="6" rx="1" fill="#FEF3C7"/>
          <rect x="22" y="36" width="6" height="6" rx="1" fill="#FEF3C7"/>
          <rect x="36" y="36" width="6" height="6" rx="1" fill="#FEF3C7"/>
          <rect x="28" y="42" width="8" height="10" rx="1" fill="#78350F"/>
        </svg>
      `)
    },
    {
      key: 'clinics',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="clGrad1" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#10B981"/>
              <stop offset="100%" stop-color="#047857"/>
            </linearGradient>
          </defs>
          <rect x="12" y="12" width="40" height="40" rx="12" fill="url(#clGrad1)"/>
          <rect x="27" y="20" width="10" height="24" rx="3" fill="#FFFFFF"/>
          <rect x="20" y="27" width="24" height="10" rx="3" fill="#FFFFFF"/>
        </svg>
      `)
    },
    {
      key: 'salons',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="salGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#EC4899"/>
              <stop offset="100%" stop-color="#BE185D"/>
            </linearGradient>
          </defs>
          <circle cx="22" cy="46" r="6" stroke="url(#salGrad1)" stroke-width="4"/>
          <circle cx="42" cy="46" r="6" stroke="url(#salGrad1)" stroke-width="4"/>
          <path d="M25 41L42 16" stroke="url(#salGrad1)" stroke-width="4" stroke-linecap="round"/>
          <path d="M39 41L22 16" stroke="url(#salGrad1)" stroke-width="4" stroke-linecap="round"/>
          <circle cx="32" cy="30" r="3" fill="#BE185D"/>
        </svg>
      `)
    },
    {
      key: 'travel',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="trGrad1" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#06B6D4"/>
              <stop offset="100%" stop-color="#0E7490"/>
            </linearGradient>
          </defs>
          <path d="M32 10L37 26L54 32L37 36L34 50L28 42L20 44L23 34L10 28L25 24L32 10Z" fill="url(#trGrad1)"/>
          <circle cx="32" cy="32" r="16" fill="none" stroke="#67E8F9" stroke-width="2" stroke-dasharray="4 4"/>
        </svg>
      `)
    },
    {
      key: 'surfClubs',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="sfGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#14B8A6"/>
              <stop offset="100%" stop-color="#0F766E"/>
            </linearGradient>
          </defs>
          <path d="M12 42C20 34 26 44 34 38C40 33 42 22 52 22C42 28 38 46 24 46C18 46 14 44 12 42Z" fill="url(#sfGrad1)"/>
          <path d="M22 20C26 12 36 10 46 14L28 46C24 40 20 28 22 20Z" fill="#F59E0B"/>
        </svg>
      `)
    },
    {
      key: 'kidsCenters',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="kcGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#8B5CF6"/>
              <stop offset="100%" stop-color="#6D28D9"/>
            </linearGradient>
          </defs>
          <path d="M32 10C32 10 44 20 44 36H20C20 20 32 10 32 10Z" fill="url(#kcGrad1)"/>
          <circle cx="32" cy="24" r="5" fill="#38BDF8"/>
          <path d="M18 36L12 46H22L18 36Z" fill="#F43F5E"/>
          <path d="M46 36L52 46H42L46 36Z" fill="#F43F5E"/>
          <path d="M28 36V44L32 48L36 44V36H28Z" fill="#F59E0B"/>
        </svg>
      `)
    },
    {
      key: 'entertainment',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="entGrad1" x1="12" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F43F5E"/>
              <stop offset="100%" stop-color="#BE123C"/>
            </linearGradient>
          </defs>
          <path d="M12 22C15 22 17 24 17 27C17 30 15 32 12 32V42H52V32C49 32 47 30 47 27C47 24 49 22 52 22V16H12V22Z" fill="url(#entGrad1)"/>
          <polygon points="32,22 34.5,28 41,28.5 36,32.5 37.5,39 32,35.5 26.5,39 28,32.5 23,28.5 29.5,28" fill="#FEF08A"/>
        </svg>
      `)
    },
    {
      key: 'hospitality',
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
          <defs>
            <linearGradient id="hspGrad1" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#78350F"/>
            </linearGradient>
          </defs>
          <path d="M16 38C16 26 22 18 32 18C42 18 48 26 48 38H16Z" fill="url(#hspGrad1)"/>
          <rect x="30" y="12" width="4" height="6" rx="2" fill="#FBBF24"/>
          <rect x="12" y="38" width="40" height="6" rx="2" fill="#451A03"/>
          <rect x="8" y="44" width="48" height="4" rx="1" fill="#78350F"/>
        </svg>
      `)
    }
  ];
}
