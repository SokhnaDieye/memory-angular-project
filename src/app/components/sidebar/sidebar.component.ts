import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    console.log('Role de l\'utilisateur:', this.role);
  }
}
