import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  words: string[] = ['Bookings', 'Memberships'];
  currentIndex = 0;
  currentWord = this.words[0];
  isHidden = false;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.isHidden = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        this.currentWord = this.words[this.currentIndex];
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
