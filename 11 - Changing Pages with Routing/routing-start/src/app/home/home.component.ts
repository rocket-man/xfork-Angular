import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onLoadServer(id: Number) {
    this.router.navigate(['/servers', id, 'edit'], {
      //if we want our buttons to navigate to different part of code without manually setting router links
      queryParams: { allowEdit: '1' },
      fragment: 'loading'
    });
  }

  onLogin() {
    this.authService.login();
  }
  onLogout() {
    this.authService.logout();
  }
}
