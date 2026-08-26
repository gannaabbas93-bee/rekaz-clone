import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly ts = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);

  wordsEn = ['Memberships', 'Bookings'];
  wordsAr = ['العضويات', 'الحجوزات'];

  currentIndex = 0;
  isFading = false;
  private intervalId: any;

  get currentWord(): string {
    const list = this.ts.currentLang() === 'ar' ? this.wordsAr : this.wordsEn;
    return list[this.currentIndex % list.length];
  }

  ngOnInit(): void {
    this.startAnimation();
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.isFading = true;
      this.cdr.markForCheck();

      setTimeout(() => {
        const list = this.ts.currentLang() === 'ar' ? this.wordsAr : this.wordsEn;
        this.currentIndex = (this.currentIndex + 1) % list.length;
        this.isFading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }, 350);
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
