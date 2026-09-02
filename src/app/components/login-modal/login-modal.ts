import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.scss']
})
export class LoginModalComponent {
  authService = inject(AuthService);
  ts = inject(TranslationService);
  private fb = inject(FormBuilder);

  closeModal = output<void>();

  mode = signal<'login' | 'register'>('login');
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  switchMode(newMode: 'login' | 'register'): void {
    this.mode.set(newMode);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;
    this.authService.login({ email: email!, password: password! }).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.successMessage.set(
          this.ts.currentLang() === 'ar' 
            ? `مرحباً بك مجدداً، ${user.fullName}!` 
            : `Welcome back, ${user.fullName}!`
        );
        setTimeout(() => this.onClose(), 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err.error?.message || (
          this.ts.currentLang() === 'ar' 
            ? 'خطأ في البريد الإلكتروني أو كلمة المرور' 
            : 'Invalid email or password'
        );
        this.errorMessage.set(msg);
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { fullName, email, password } = this.registerForm.value;
    this.authService.register({ fullName: fullName!, email: email!, password: password! }).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.successMessage.set(
          this.ts.currentLang() === 'ar' 
            ? `تم إنشاء حسابك بنجاح، مرحباً بك ${user.fullName}!` 
            : `Account created successfully, welcome ${user.fullName}!`
        );
        setTimeout(() => this.onClose(), 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err.error?.message || (
          this.ts.currentLang() === 'ar' 
            ? 'فشل إنشاء الحساب، يرجى المحاولة لاحقاً' 
            : 'Registration failed, please try again'
        );
        this.errorMessage.set(msg);
      }
    });
  }
}
