import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../navigation/navigation';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Navigation, Footer, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {
  String = String;

  // --- Photo Gallery Logic ---
  currentPhotoIndex = 0;
  private photoInterval: any;
  private readonly PHOTO_SLIDE_DURATION = 4000;

  galleryImages = [
    { src: 'gallery1.jpg', alt: 'Julien 1' },
    { src: 'gallery2.jpg', alt: 'Julien 2' },
    { src: 'gallery3.jpg', alt: 'Julien 3' },
    { src: 'gallery4.jpg', alt: 'Julien 4' },
    { src: 'gallery5.jpg', alt: 'Julien 5' }
  ];

  // --- Testimonials Logic ---
  currentTestimonialIndex = 0;
  slideDirection: 'left' | 'right' | null = null;

  // --- Intersection Observer Logic ---
  private observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  private intersectionObserver: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  // Timeline data
  timeline = [
    {
      year: '2023',
      title: 'Started My Coding Journey',
      description: 'Discovered my passion for web development. Learned the basics of programming and fell in love with problem-solving through code.',
      tags: ['Python', 'Java', 'Learning', 'Fundamentals']
    },
    {
      year: '2024',
      title: 'Deep Dive into Web Development',
      description: 'Mastered the core technologies of web development. Built multiple projects combining frontend beauty with backend functionality.',
      tags: ['HTML', 'CSS', 'MySQL', 'JavaScript', 'PHP']
    },
    {
      year: '2025',
      title: 'Modern Framework Mastery',
      description: 'Advanced into modern frameworks and design systems. Created scalable applications with focus on performance and user experience.',
      tags: ['Figma', 'Node.js', 'TailwindCSS', 'Vue.js', 'Angular']
    },
    {
      year: '2026',
      title: 'Professional Growth Phase',
      description: 'Freelancing, mentoring developers, and building premium portfolios. Focusing on architecture and best practices.',
      tags: ['Freelance', 'Mentoring', 'Performance', 'Architecture']
    }
  ];

  // Expertise areas
  expertise = [
    {
      type: 'frontend',
      title: 'Frontend Development',
      description: 'Building responsive, animated, and performant user interfaces with modern frameworks.',
      skills: ['Angular', 'Vue.js', 'TypeScript', 'RxJS', 'TailwindCSS', 'Responsive Design', 'Animations']
    },
    {
      type: 'backend',
      title: 'Backend Development',
      description: 'Developing scalable server-side applications with secure APIs and database optimization.',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'Authentication', 'Middleware']
    },
    {
      type: 'design',
      title: 'UI/UX Design',
      description: 'Creating intuitive interfaces with user-centric design principles and accessibility in mind.',
      skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Testing', 'Accessibility']
    },
    {
      type: 'tools',
      title: 'Tools & Deployment',
      description: 'Managing development workflows and deploying applications on modern cloud platforms.',
      skills: ['Git & GitHub', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'VS Code', 'Postman']
    }
  ];

  // Testimonials data
  testimonials = [
    {
      name: 'Shannen G. Pascual',
      relation: 'Full-Stack Collaborator • MJ Quality Cars',
      photo: './testimonials/shan.jpg',
      description: 'Julien delivered exceptional work during the MJ Quality Cars lifecycle. His ability to bridge the gap between complex backend logic and a seamless frontend experience was pivotal. The attention to detail in the system architecture resulted in a product that truly exceeded our group\'s expectations.'
    },
    {
      name: 'Jeremy M. Punsalan',
      relation: 'Project Owner • CEO of MJ Quality Cars',
      photo: './testimonials/jem.jpg',
      description: 'Working with Julien transformed our digital presence. As a stakeholder, I value his rare ability to translate business requirements into high-performance features. He doesn\'t just build applications; he crafts digital solutions that combine aesthetic elegance with high-impact functionality.'
    },
    {
      name: 'Ed Clarence Castillo',
      relation: 'Design Strategist • Classmate 2023-2026',
      photo: './testimonials/ed.jpg',
      description: 'Julien possesses an intuitive understanding of UI/UX principles that is rare in developers. Throughout our years of collaboration, his implementations of complex design systems were flawless—preserving every pixel while optimizing for performance and responsiveness.'
    },
    {
      name: 'Micko Q. Alberto',
      relation: 'System Architect • MJ Quality Cars',
      photo: './testimonials/micko.jpg',
      description: 'A brilliant collaborator and tactical problem solver. In the MJ Quality Cars project, Julien\'s code was consistently clean, well-documented, and scalable. His disciplined approach to software architecture and debugging saved us countless hours during the integration phase.'
    },
    {
      name: 'Khristian Carl Pradilla',
      relation: 'Peer Reviewer • Classmate 2023-2026',
      photo: './testimonials/kc.png',
      description: 'Julien has a unique talent for taking a raw vision and bringing it to life with modern web technologies. His projects consistently set the standard for our cohort, delivering websites that perform with high speed and look like premium, production-ready products.'
    }
  ];

  // Certificates data
  certificates = [
    {
      name: 'CompTIA IT Fundamentals+ (ITF+) Certification',
      issuer: 'Credly/CompTIA',
      date: '2023',
      image: './certifications/comptia-itf+.png',
      link: 'https://www.credly.com/badges/e37533b6-2470-4a92-9e97-a0a17e792904/public_url'
    },
    {
      name: 'Website UI/UX Designging using ChatGPT',
      issuer: 'Simplilearn|SkillUP',
      date: '2025',
      image: './certifications/uiux-designing.png',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjM3IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODg1MzQwNF83NDUzNDQ0MTc1NjExODk2OTI3OC5wbmciLCJ1c2VybmFtZSI6Ikp1bGllbiBNaWNoYWVsIFB1bnNhbGFuIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1477668705934585441&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVzzXzMTawDE6MNEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAWrAPUT8AAAA%3D'
    },
    {
      name: 'Introduction to Graphic Design; Basics of UI/UX',
      issuer: 'Simplilearn|SkillUP',
      date: '2025',
      image: './certifications/graphic-design.png',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzNDA1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODg1Mjg3MF83NDUzNDQ0MTc1NjExODgyMTczMy5wbmciLCJ1c2VybmFtZSI6Ikp1bGllbiBNaWNoYWVsIFB1bnNhbGFuIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1477668705934585441&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVzw6ocraoDE6MNEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUA175C%2Bz8AAAA%3D'
    },
    {
      name: 'Design Thinking for Beginners',
      issuer: 'Simplilearn|SkillUP',
      date: '2025',
      image: './certifications/design-thinking.png',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzgwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODY3ODA2OF83NDUzNDQ0MTc1MzU0MTQzNjcxOS5wbmciLCJ1c2VybmFtZSI6Ikp1bGllbiBNaWNoYWVsIFB1bnNhbGFuIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1477668705934585441&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVLzf2jTQJD0qMNEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAe2TIDD8AAAA%3D'
    },
    {
      name: 'Introduction to Figma',
      issuer: 'Simplilearn|SkillUP',
      date: '2024',
      image: './certifications/introduction-figma.png',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0MzcyIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJfNzM4NjEzNF8xNzI2NzIyMjcwLnBuZyIsInVzZXJuYW1lIjoiSnVsaWVuIE1pY2hhZWwgUHVuc2FsYW4ifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1477668705934585441&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVr3IrCStzDEyMNEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAmgCUdj8AAAA%3D'
    },
    {
      name: 'Introduction to PHP',
      issuer: 'Simplilearn|SkillUP',
      date: '2025',
      image: './certifications/introduction-php.png',
      
    },
    {
      name: 'Content Marketing Certified',
      issuer: 'HubSpot Academy',
      date: '2025',
      image: './certifications/content-marketing.png',
      link: 'https://app-na2.hubspot.com/academy/achievements/1mhh0w3s/en/1/jm-punsalan/content-marketing'
    },
    {
      name: 'Digital Advertising Certified',
      issuer: 'HubSpot Academy',
      date: '2025',
      image: './certifications/digital-advertising.png',
      link: 'https://app-na2.hubspot.com/academy/achievements/3fzsmj8m/en/1/jm-punsalan/digital-advertising'
    },
    {
      name: 'SEO Certified',
      issuer: 'HubSpot Academy',
      date: '2026',
      image: './certifications/seo1.png',
      link: 'https://app-na2.hubspot.com/academy/achievements/3qdw2s50/en/1/jm-punsalan/seo'
    },
    {
      name: 'SEO II Certified',
      issuer: 'HubSpot Academy',
      date: '2026',
      image: './certifications/seo2.png',
      link: 'https://app-na2.hubspot.com/academy/achievements/2j9sdjr8/en/1/jm-punsalan/seo-ii'
    },
    {
      name: 'Legacy JavaScript Algorithms and Data Structures V7',
      issuer: 'FreeCodeCamp',
      date: '2025',
      image: './certifications/javascript-algorithms.png',
      link: 'https://www.freecodecamp.org/certification/jm_punsalan10/javascript-algorithms-and-data-structures'
    },
    {
      name: 'Backend Development and APIs V8',
      issuer: 'FreeCodeCamp',
      date: '2025',
      image: './certifications/backend-development.png',
      link: 'https://www.freecodecamp.org/certification/jm_punsalan10/back-end-development-and-apis'
    },
    {
      name: 'Legacy Responsive Web Design V8',
      issuer: 'FreeCodeCamp',
      date: '2025',
      image: './certifications/responsive-web-design.png',
      link: 'https://www.freecodecamp.org/certification/jm_punsalan10/responsive-web-design'
    },
    {
      name: 'Legacy Responsive Web Design V8',
      issuer: 'FreeCodeCamp',
      date: '2025',
      image: './certifications/js-essential.png',
    },
    
  ];

  ngOnInit(): void {
    this.initScrollAnimations();
    this.startPhotoGalleryCarousel();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.stopPhotoGalleryCarousel();
  }

  /**
   * PHOTO GALLERY METHODS
   */
  private startPhotoGalleryCarousel(): void {
    this.photoInterval = setInterval(() => {
      this.nextPhoto();
    }, this.PHOTO_SLIDE_DURATION);
  }

  private stopPhotoGalleryCarousel(): void {
    if (this.photoInterval) {
      clearInterval(this.photoInterval);
    }
  }

  nextPhoto(): void {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.galleryImages.length;
    this.cdr.detectChanges();
  }

  handleGalleryClick(): void {
    this.nextPhoto();
    this.stopPhotoGalleryCarousel();
    this.startPhotoGalleryCarousel();
  }

  /**
   * TESTIMONIAL CAROUSEL METHODS (manual navigation only)
   */
  private triggerSlideAnimation(direction: 'left' | 'right'): void {
    this.slideDirection = null;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.slideDirection = direction;
      this.cdr.detectChanges();
    }, 10);
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    this.triggerSlideAnimation('right');
  }

  prevTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.triggerSlideAnimation('left');
  }

  goToTestimonial(index: number): void {
    const direction = index > this.currentTestimonialIndex ? 'right' : 'left';
    this.currentTestimonialIndex = index;
    this.triggerSlideAnimation(direction);
  }

  /**
   * SCROLL ANIMATIONS
   */
  private initScrollAnimations(): void {
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-in-stagger'
      );

      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

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
    }, 100);
  }
}