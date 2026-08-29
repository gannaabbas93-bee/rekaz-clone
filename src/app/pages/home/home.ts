import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { BookingFormComponent } from '../../components/booking-form/booking-form';
import { IndustriesGridComponent } from '../../components/industries-grid/industries-grid';
import { WhatsappButton } from '../../components/whatsapp-button/whatsapp-button';
import { FloatingVideoCard } from '../../components/floating-video-card/floating-video-card';

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
export class Home {}


