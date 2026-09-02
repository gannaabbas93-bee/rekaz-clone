import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LoginModalComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly ts = inject(TranslationService);
  readonly authService = inject(AuthService);

  isMobileMenuOpen = signal(false);
  isLoginModalOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(prev => !prev);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  toggleLanguage() {
    this.ts.toggleLanguage();
  }

  openLoginModal() {
    this.isLoginModalOpen.set(true);
    this.closeMobileMenu();
  }

  closeLoginModal() {
    this.isLoginModalOpen.set(false);
  }

  onLogout() {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
