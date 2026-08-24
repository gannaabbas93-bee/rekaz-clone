import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';

@Component({
  selector: 'app-floating-video-card',
  standalone: true,
  imports: [],
  templateUrl: './floating-video-card.html',
  styleUrl: './floating-video-card.scss'
})
export class FloatingVideoCard implements AfterViewInit {
  @ViewChild('videoMedia') videoElement!: ElementRef<HTMLVideoElement>;
  isModalOpen = signal(false);

  ngAfterViewInit(): void {
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.muted = true;
      this.videoElement.nativeElement.play().catch(err => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
