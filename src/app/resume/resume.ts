import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../navigation/navigation';
import { Footer } from '../footer/footer';

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string[];
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, Navigation, Footer],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume implements OnInit, OnDestroy {
  private observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  private intersectionObserver: IntersectionObserver | null = null;

  // Header Info
  personalInfo = {
    name: 'JULIEN MICHAEL PUNSALAN',
    title: 'FULL STACK DEVELOPER',
    phone: '+63 921 603 0791',
    email: 'jmppunsalan@gmail.com',
    location: 'San Francisco, Mabalacat, Pampanga',
    photo: '/formaljm.png',
    objective: 'Motivated BSIT student specializing in web and mobile application development, seeking an internship or entry-level position where I can apply front-end development, UI design, and system analysis skills while gaining professional industry experience.'
  };

  // Projects
  projects: Project[] = [
    {
      title: 'GrabMeYaya – Service Hiring Web Application',
      description: [
        'Designed a user-friendly web interface connecting families with caregivers, focusing on clarity, accessibility, and responsive layout.',
        'Built structured page layouts using HTML, CSS, and JavaScript.'
      ]
    },
    {
      title: 'IPONLY – Personal Budget Tracker',
      description: [
        'Developed a clean front-end interface for tracking income and expenses with an emphasis on usability and visual hierarchy.',
        'Implemented responsive design using Vue.js, Express JS, and Tailwind CSS.'
      ]
    },
    {
      title: 'MJ Quality Cars – Used Car Sales Website',
      description: [
        'Designed and built a responsive website for displaying used car listings with clear navigation and layout structure.',
        'Applied front-end design principles to enhance user browsing experience.',
        'Tools used: HTML, CSS, Typescript, Express JS, Angular.'
      ]
    }
  ];

  // Education
  education = {
    school: 'Holy Angel University',
    degree: 'Bachelor in Information Technology',
    location: 'Angeles City, Pampanga',
    graduation: 'Expected Graduation: April 2027',
    awards: [
      "President's/Dean's List Academic Achievement Award, 1st & 2nd Semester 2023–2026"
    ]
  };

  // Skills
  skills: Skill[] = [
    {
      category: 'Technical Skills',
      items: ['HTML', 'CSS', 'JavaScript', 'Dart (Flutter)', 'Vue.js', 'Angular Framework', 'UI/UX Design', 'Front-End Dev', 'Back-End Dev', 'QA Tester']
    },
    {
      category: 'Tools & Technologies',
      items: ['Flutter', 'Android Studio', 'Visual Studio Code', 'GitHub', 'Figma', 'Canva']
    },
    {
      category: 'Soft Skills',
      items: ['Team Collaboration', 'Time Management', 'Problem Solving', 'Clear Communication']
    }
  ];

  // Certifications
  certifications: Certification[] = [
    {
      title: 'CompTIA ITF+',
      issuer: 'Coursera',
      year: '2023'
    },
    {
      title: 'Website UI/UX Designging using ChatGPT',
      issuer: 'Simplilearn|SkillUP',
      year: '2025'
    },
    {
      title: 'Introduction to Graphic Design; Basics of UI/UX',
      issuer: 'Simplilearn|SkillUP',
      year: '2025'
    },
    {
      title: 'Design Thinking for Beginners',
      issuer: 'Simplilearn|SkillUP',
      year: '2025'
    },
    {
      title: 'Introduction to Figma',
      issuer: 'Simplilearn|SkillUP',
      year: '2024'
    },
    {
      title: 'Introduction to PHP',
      issuer: 'Simplilearn|SkillUP',
      year: '2025'
    },
    {
      title: 'Content Marketing Certified',
      issuer: 'HubSpot Academy',
      year: '2025'
    },
    {
      title: 'Digital Advertising Certified',
      issuer: 'HubSpot Academy',
      year: '2025'
    },
    {
      title: 'SEO Certified',
      issuer: 'HubSpot Academy',
      year: '2026'
    },
    {
      title: 'SEO II Certified',
      issuer: 'HubSpot Academy',
      year: '2026'
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures V7',
      issuer: 'FreeCodeCamp',
      year: '2025'
    },
        {
      title: 'Backend Development and APIs V8',
      issuer: 'FreeCodeCamp',
      year: '2025'
    },
    {
      title: 'Legacy Responsive Web Design V8',
      issuer: 'FreeCodeCamp',
      year: '2025'
    },
    {
      title: 'Legacy Responsive Web Design V8',
      issuer: 'FreeCodeCamp',
      year: '2025'
    },

  ];

  // Additional Info
  languages = ['English', 'Filipino', 'Kapampangan'];
  reference = {
    name: 'Chris Almocera',
    title: 'almocerachris@gmail.com'
  };

  ngOnInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private initScrollAnimations(): void {
    setTimeout(() => {
      const elements = document.querySelectorAll(
        '.scroll-reveal, .project-card, .skill-section, .cert-card'
      );

      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, this.observerOptions);

      elements.forEach((el) => this.intersectionObserver?.observe(el));
    }, 100);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = '/Julien-Michael-Punsalan-Resume.pdf';
    link.download = 'Julien-Michael-Punsalan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}