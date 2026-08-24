import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  readonly ts = inject(TranslationService);

  currentIndex = 0;
  isHidden = false;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  get currentWord(): string {
    const words = this.ts.t().hero.words;
    return words[this.currentIndex % words.length];
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.isHidden = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        const words = this.ts.t().hero.words;
        this.currentIndex = (this.currentIndex + 1) % words.length;
        this.isHidden = false;
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
