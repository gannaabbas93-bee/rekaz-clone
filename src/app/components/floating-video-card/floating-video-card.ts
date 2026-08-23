import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-floating-video-card',
  standalone: true,
  imports: [],
  templateUrl: './floating-video-card.html',
  styleUrl: './floating-video-card.scss'
})
export class FloatingVideoCard {
  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
