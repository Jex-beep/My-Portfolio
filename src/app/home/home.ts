import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../navigation/navigation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navigation, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy, AfterViewInit {
  String = String;
  showLoader = true;

  // Title characters for animated reveal
  titleChars1 = 'Julien Michael'.split('').map(char => char === ' ' ? '\u00A0' : char);
  titleChars2 = 'P. Punsalan'.split('').map(char => char === ' ' ? '\u00A0' : char);

  // Animated roles
  roles = ['Web Developer', 'UI Designer', 'Full-Stack Builder'];

  // Stats in hero section
  stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Completed' },
    { number: '100%', label: 'Commitment' }
  ];

// Featured projects updated with your specific work
  featuredProjects = [
    {
      name: 'MJ Quality Cars',
      category: 'E-commerce',
      tech: 'Angular • Node.js • MongoDB',
      image: 'mjlogo.png',
      description: 'A premium platform for selling used cars.',
      url: 'https://www.mjqualitycars.com/'
    },
    {
      name: 'Iponly',
      category: 'FinTech',
      tech: 'Vue.js • TailwindCSS • Node.js • MongoDB',
      image: 'iponlylogo.png',
      description: 'A smart budget and savings tracker.',
      url: 'https://iponly.vercel.app/'
    },
    {
      name: 'GrabMeYaya',
      category: 'Web App',
      tech: 'PHP • MySQL • CSS',
      image: 'grabmeyayalogo.png',
      description: 'On-demand service for hiring and becoming a yaya.',
      url: 'https://grabmeyaya.onlinewebshop.net/login.php'
    }
  ];

  // Expertise areas
  expertise = [
    {
      title: 'Frontend Development',
      description: 'Building scalable, performant Angular apps with modern patterns and best practices.',
      items: ['Angular', 'TypeScript', 'RxJS', 'Performance']
    },
    {
      title: 'UI/UX Design',
      description: 'Crafting intuitive, beautiful interfaces focused on user experience and accessibility.',
      items: ['Figma', 'Design Systems', 'Animations', 'Accessibility']
    },
    {
      title: 'Backend Development',
      description: 'End-to-end solutions from frontend design to backend APIs and deployment.',
      items: ['Node.js', 'APIs', 'MongoDB', 'DevOps']
    },
    {
      title: 'Problem Solving',
      description: 'Breaking down complex challenges into elegant, efficient technical solutions.',
      items: ['Architecture', 'Optimization', 'Testing', 'Refactoring']
    }
  ];

  // Stats data
  statsData = [
    { number: 15, suffix: '+', title: 'Projects Built', progress: 75 },
    { number: 3, suffix: '+', title: 'Years Experience', progress: 60 },
    { number: 100, suffix: '%', title: 'Code Quality', progress: 100 },
    { number: 2, suffix: '+', title: 'Happy Clients', progress: 85 }
  ];

  private observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  private intersectionObserver: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;
  private activeExpertiseIndex: number = -1;
  private loaderTimeout: any;

  ngOnInit(): void {
    // Handle page loader
    this.handlePageLoader();
  }

  ngAfterViewInit(): void {
    // Initialize animations after loader completes
    setTimeout(() => {
      this.initScrollAnimations();
      this.initLiveAnimations();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.loaderTimeout) {
      clearTimeout(this.loaderTimeout);
    }
  }

  /**
   * Handle page loader animation
   */
  private handlePageLoader(): void {
    // Hide loader after animation completes
    this.loaderTimeout = setTimeout(() => {
      this.showLoader = false;
    }, 2300); // Matches the loader animation duration
  }

  /**
   * Initialize scroll-triggered animations
   */
  private initScrollAnimations(): void {
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-fade-in-stagger'
    );

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Trigger underline animation for section headers
          const underline = entry.target.querySelector('.header-underline');
          if (underline) {
            underline.classList.add('animated');
          }
        }
      });
    }, this.observerOptions);

    animatedElements.forEach((el) => {
      this.intersectionObserver?.observe(el);
    });
  }

  /**
   * Initialize continuous live animations
   */
  private initLiveAnimations(): void {
    this.animateMousePosition();
    this.animateCounters();
  }

  /**
   * Smooth mouse tracking for interactive elements
   */
  private animateMousePosition(): void {
    const updateMousePosition = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', updateMousePosition);
  }

  /**
   * Animate stat counters on scroll
   */
  private animateCounters(): void {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    const animateCounter = (element: HTMLElement, target: number) => {
      const countElement = element.querySelector('.count-value') as HTMLElement;
      if (!countElement) return;

      let current = 0;
      const increment = target / 60; // 60 frames for smooth animation
      const duration = 1500; // 1.5 seconds
      const frameTime = duration / 60;

      const counter = () => {
        current += increment;
        if (current < target) {
          countElement.textContent = Math.ceil(current).toString();
          setTimeout(counter, frameTime);
        } else {
          countElement.textContent = target.toString();
        }
      };

      counter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt((entry.target as HTMLElement).getAttribute('data-target') || '0');
          const hasAnimated = (entry.target as HTMLElement).classList.contains('animated');
          
          if (!hasAnimated) {
            (entry.target as HTMLElement).classList.add('animated');
            animateCounter(entry.target as HTMLElement, target);
          }
        }
      });
    }, { threshold: 0.5 });

    statBoxes.forEach((box) => observer.observe(box));
  }

  /**
   * Handle expertise card hover
   */
  onExpertiseHover(index: number): void {
    this.activeExpertiseIndex = index;
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.add('dimmed');
      }
    });
  }

  /**
   * Reset expertise hover state
   */
  onExpertiseLeave(): void {
    this.activeExpertiseIndex = -1;
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach((card) => {
      card.classList.remove('active', 'dimmed');
    });
  }

  /**
   * Track mouse movement for gradient effect on expertise cards
   */
  onExpertiseMouseMove(event: MouseEvent, index: number): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
