import { Component, signal, OnInit, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Website-Portfolio');

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Because height is 100% on html/body, we must reset both specifically
      this.document.documentElement.scrollTop = 0;
      this.document.body.scrollTop = 0;
      
      // Also reset the window just in case
      window.scrollTo(0, 0);
    });
  }
}