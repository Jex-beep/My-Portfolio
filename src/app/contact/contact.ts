import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navigation } from '../navigation/navigation';
import { FooterComponent } from '../footer/footer';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, Navigation, FooterComponent, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

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
    try {
      emailjs.init({
        publicKey: 'fdKiUJiJkms7lnJ1D',
        blockHeadless: false,
        limitRate: {
          id: 'app',
          throttle: 50,
        },
      });
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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async onSubmit(): Promise<void> {
    if (this.submitLock) return;

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

    this.errorMessage = '';
    this.isSubmitting = true;
    this.submitLock = true;

    // Capture form values BEFORE resetting
    const payload = {
      name:    this.formData.name,
      email:   this.formData.email,
      title:   this.formData.subject,   // matches {{title}} in your template subject line
      message: this.formData.message,   // matches {{message}} in your template body
      time:    new Date().toLocaleString('en-PH', {
                 dateStyle: 'medium',
                 timeStyle: 'short'
               }),
    };

    // Show success and reset form immediately
    this.showSuccess = true;
    this.resetForm();

    // Send in background
    emailjs.send(
      'service_h64pn57',
      'template_f9pq3at',
      payload,
      'fdKiUJiJkms7lnJ1D'
    ).then((response) => {
      console.log('Email sent successfully:', response);
    }).catch((error) => {
      console.error('EmailJS send error:', error);
    });

    // Auto-dismiss after 4 seconds
    this.successTimeout = setTimeout(() => {
      this.showSuccess = false;
      this.isSubmitting = false;
      this.submitLock = false;
    }, 4000);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  closeSuccess(): void {
    this.showSuccess = false;
    this.isSubmitting = false;
    this.submitLock = false;
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  setFocus(field: string, state: boolean): void {
    (this.isFocused as any)[field] = state;
  }
}