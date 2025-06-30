import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/aboutUs-page/aboutUs.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainIndexComponent } from './components/main-index/main-index.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutUsComponent,
    LoginPageComponent,
    MainIndexComponent,
    NavbarComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AlgoViz';
  darkModeService: any;
}
