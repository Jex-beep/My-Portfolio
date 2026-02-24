import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Resume } from './resume/resume';
import { Contact } from './contact/contact';
import { Error } from './error/error';

export const routes: Routes = [
  { 
    path: '', 
    component: Home, 
    title: 'Home | Web Developer Portfolio'
  },
  { 
    path: 'about', 
    component: About, 
    title: 'About | Professional Bio' 
  },
  { 
    path: 'projects', 
    component: Projects, 
    title: 'Projects | My Work' 
  },
  { 
    path: 'resume', 
    component: Resume, 
    title: 'Resume | Experience & Skills'
  },
  { 
    path: 'contact', 
    component: Contact, 
    title: 'Contact | Get In Touch' 
  },
  { 
    path: '404', 
    component: Error, 
    title: '404 | Page Not Found' 
  },
  { 
    path: '**', 
    redirectTo: '404' // Best practice: redirect wildcards to your 404 path
  }
];