import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../navigation/navigation';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

interface ProjectShowcase {
  id: number;
  title: string;
  type: string;
  goal: string;
  role: string;
  features: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  status: 'Completed' | 'Prototype' | 'In Development';
  layout: 'left' | 'right';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, Navigation, Footer, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit, OnDestroy {
  // --- Hero Spotlight Carousel ---
  spotlightProjects: ProjectShowcase[] = [];
  currentSpotlightIndex: number = 0;
  private spotlightInterval: any;
  // --------------------------------

  private observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  private intersectionObserver: IntersectionObserver | null = null;
  currentImageIndex: { [key: number]: number } = {};

projects: ProjectShowcase[] = [
  {
    id: 1,
    title: 'GrabMeYaya',
    type: 'Two-Sided Hiring Platform',
    goal: 'To architect a high-performance, dual-access digital ecosystem that streamlines the domestic service recruitment process. The primary objective was to eliminate traditional friction points by creating a secure, verified environment where service providers can showcase their professional history while employers benefit from an optimized, filter-driven hiring experience.',
    role: 'Full-Stack Developer',
    features: ['Dual-role registration system', 'User profile management system', 'Advanced hiring interface', 'Simple dashboard layout', 'Clean and intuitive user flow'],
    images: ['./grabmeyayalogo.png','./projects/grabmeyaya1.png', './projects/grabmeyaya2.png', './projects/grabmeyaya3.png', './projects/grabmeyaya4.png'],
    liveUrl: 'https://grabmeyaya.onlinewebshop.net/login.php',
    githubUrl: '#',
    technologies: ['Angular', 'Node.js', 'PostgreSQL'],
    status: 'Completed',
    layout: 'left'
  },
  {
    id: 2,
    title: 'MJ Quality Cars',
    type: 'E-Commerce Platform',
    goal: 'To develop a premium, visually-driven automotive marketplace that replicates the prestige of a physical showroom. The project focused on engineering a high-speed inventory management system capable of handling high-resolution media while maintaining a "performance-first" user interface, ensuring that potential buyers enjoy a seamless transition from vehicle discovery to final inquiry.',
    role: 'Full-Stack Developer',
    features: ['Car listing grid with advanced filtering', 'Detailed vehicle information pages', 'Organized category navigation system', 'Clean UI navigation interface', 'Interactive image gallery for vehicles'],
    images: ['./mjlogo.png','./projects/mjqualitycars1.png','./projects/mjqualitycars2.png', './projects/mjqualitycars3.png',],
    liveUrl: 'https://www.mjqualitycars.com/',
    githubUrl: '#',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'TailwindCSS'],
    status: 'Completed',
    layout: 'right'
  },
  {
    id: 3,
    title: 'Iponly',
    type: 'Budget & Savings Tracker',
    goal: 'To engineer an intuitive financial management tool specifically optimized for the student demographic, where financial literacy and accessibility are key. The goal was to build a data-driven application that simplifies complex expense tracking into digestible visual insights, empowering users to make informed financial decisions through a minimalist yet powerful analytical dashboard.',
    role: 'Frontend Developer & Designer',
    features: ['Expense logging and categorization', 'Real-time savings tracking system', 'Interactive dashboard overview', 'Clean financial summary UI', 'Fully responsive layout design'],
    images: ['./iponlylogo.png','./projects/iponly1.png','./projects/iponly2.png', './projects/iponly3.png',],
    liveUrl: 'https://iponly.vercel.app/',
    githubUrl: '#',
    technologies: ['Vue.js', 'Express.js', 'MySQL'],
    status: 'Completed',
    layout: 'left'
  },
  {
    id: 4,
    title: 'MJ Quality Cars – UI Prototype',
    type: 'Design Prototype',
    goal: 'To conduct an extensive UI/UX research and design phase focused on creating a blueprint for the future of digital automotive sales. The objective was to establish a rigorous design system and visual language—balancing negative space, high-contrast typography, and intuitive user flows—ensuring total structural integrity before entering the software development lifecycle.',
    role: 'UI/UX Designer',
    features: ['Wireframe-inspired layout design', 'UI exploration and experimentation', 'Structural planning documentation', 'Component layout design system', 'Visual hierarchy establishment'],
    images: ['./figmalogo.png', './projects/figma1.png', './projects/figma2.png', './projects/figma3.png'],
    liveUrl: 'https://www.figma.com/design/COtl5ZUkeuoenKodo8Jt7F/Untitled?node-id=0-1&t=RCCfLfWRsoidT01H-1',
    githubUrl: '#',
    technologies: ['Figma', 'Adobe XD'],
    status: 'Prototype',
    layout: 'right'
  }
];

upcomingProject: ProjectShowcase = {
  id: 5,
  title: 'CAMPASS',
  type: 'Queue Management System',
  goal: 'To revolutionize the student service experience at Holy Angel University by engineering a centralized, real-time queue management ecosystem. The project aims to eliminate physical congestion and administrative bottlenecks through the implementation of a synchronized digital waiting room, allowing students to manage their time effectively while providing administrators with data-driven insights to optimize campus service efficiency.',
  role: 'Full-Stack Developer',
  features: [
    'Real-time queue tracking system',
    'Digital service appointment scheduling',
    'Student notification system',
    'Admin analytics dashboard',
    'Mobile-optimized interface'
  ],
  images: ['./campasslogo.png'],
  liveUrl: '#',
  githubUrl: '#',
  technologies: ['Angular', 'Node.js', 'Socket.io', 'PostgreSQL'],
  status: 'In Development',
  layout: 'left'
};

  ngOnInit(): void {
    this.initScrollAnimations();
    
    // Initialize spotlight carousel with first 3 projects + upcoming CAMPASS
    const targets = ['GrabMeYaya', 'MJ Quality Cars', 'Iponly'];
    this.spotlightProjects = [
      ...this.projects.filter(p => targets.includes(p.title)),
      this.upcomingProject
    ];

    // Start auto-rotation every 3 seconds
    this.startSpotlightTimer();

    this.projects.forEach(project => this.currentImageIndex[project.id] = 0);
    this.currentImageIndex[5] = 0;
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    this.stopSpotlightTimer();
  }

  // --- Spotlight Carousel Methods ---
  
  startSpotlightTimer(): void {
    this.stopSpotlightTimer();
    this.spotlightInterval = setInterval(() => {
      this.nextSpotlight();
    }, 3000);
  }

  stopSpotlightTimer(): void {
    if (this.spotlightInterval) {
      clearInterval(this.spotlightInterval);
    }
  }

  nextSpotlight(): void {
    this.currentSpotlightIndex = (this.currentSpotlightIndex + 1) % this.spotlightProjects.length;
  }

  prevSpotlight(): void {
    this.currentSpotlightIndex = (this.currentSpotlightIndex - 1 + this.spotlightProjects.length) % this.spotlightProjects.length;
  }

  goToSpotlight(index: number): void {
    this.currentSpotlightIndex = index;
    this.startSpotlightTimer();
  }

  // --- Image Carousel Methods ---
  nextImage(projectId: number, totalImages: number): void {
    this.currentImageIndex[projectId] = (this.currentImageIndex[projectId] + 1) % totalImages;
  }

  previousImage(projectId: number, totalImages: number): void {
    this.currentImageIndex[projectId] = (this.currentImageIndex[projectId] - 1 + totalImages) % totalImages;
  }

  goToImage(projectId: number, index: number): void {
    this.currentImageIndex[projectId] = index;
  }

  private initScrollAnimations(): void {
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.scroll-reveal, .project-item, .upcoming-item');
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      }, this.observerOptions);
      animatedElements.forEach((el) => this.intersectionObserver?.observe(el));
    }, 100);
  }
}