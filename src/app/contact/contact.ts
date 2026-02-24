import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navigation } from '../navigation/navigation';
import { Footer } from '../footer/footer';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, Navigation, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {
  // Form data
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Form states
  isSubmitting = false;
  showSuccess = false;
  errorMessage = '';
  isFocused = {
    name: false,
    email: false,
    subject: false,
    message: false
  };

  private observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  private intersectionObserver: IntersectionObserver | null = null;
  private successTimeout: any;
  private submitLock = false;

  contactInfo = [
    {
      icon: 'phone',
      label: 'Phone',
      value: '+63 921 603 0791',
      href: 'tel:+639216030791'
    },
    {
      icon: 'email',
      label: 'Email',
      value: 'jmppunsalan@gmail.com',
      href: 'mailto:jmppunsalan@gmail.com'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'San Francisco, Mabalacat, Pampanga',
      href: '#'
    }
  ];

  ngOnInit(): void {
    // Initialize EmailJS with public key
    try {
      emailjs.init({
        publicKey: 'fdKiUJiJkms7lnJ1D',
        blockHeadless: false,
        limitRate: {
          id: 'app',
          throttle: 50,
        },
      });
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  /**
   * Initialize scroll-based animations
   */
  private initScrollAnimations(): void {
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.scroll-reveal, .form-field, .contact-item');

      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, this.observerOptions);

      animatedElements.forEach((el) => this.intersectionObserver?.observe(el));
    }, 150);
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handle form submission - Shows success popup immediately
   */
  async onSubmit(): Promise<void> {
    // Prevent multiple submissions
    if (this.submitLock) {
      return;
    }

    // Validation
    if (!this.formData.name.trim()) {
      this.errorMessage = 'Please enter your name';
      return;
    }

    if (!this.formData.email.trim()) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    if (!this.isValidEmail(this.formData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (!this.formData.subject.trim()) {
      this.errorMessage = 'Please enter a subject';
      return;
    }

    if (!this.formData.message.trim()) {
      this.errorMessage = 'Please enter a message';
      return;
    }

    // Clear error message and lock submission
    this.errorMessage = '';
    this.isSubmitting = true;
    this.submitLock = true;

    try {
      console.log('Sending email with data:', {
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message,
      });

      // Show success popup IMMEDIATELY when user clicks send
      this.showSuccess = true;
      this.resetForm();

      // Send email via EmailJS in background (non-blocking)
      emailjs.send(
        'service_h64pn57',
        'template_f9pq3at',
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
          reply_to: this.formData.email,
          to_email: 'jmppunsalan@gmail.com'
        },
        'fdKiUJiJkms7lnJ1D'
      ).then((response) => {
        console.log('Email sent successfully:', response);
      }).catch((error) => {
        console.error('EmailJS Error Details:', error);
      });

      // Auto-dismiss popup after 4 seconds
      this.successTimeout = setTimeout(() => {
        this.showSuccess = false;
        this.isSubmitting = false;
        this.submitLock = false;
      }, 4000);

    } catch (error: any) {
      console.error('Form Error:', error);
      this.isSubmitting = false;
      this.submitLock = false;
      this.errorMessage = 'An error occurred. Please try again.';
    }
  }

  /**
   * Reset form data
   */
  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  /**
   * Close success popup
   */
  closeSuccess(): void {
    this.showSuccess = false;
    this.isSubmitting = false;
    this.submitLock = false;
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  /**
   * Set focus state for input
   */
  setFocus(field: string, state: boolean): void {
    (this.isFocused as any)[field] = state;
  }
}