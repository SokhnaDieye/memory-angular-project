import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notifications: any[] = [];
  showNotifications = false;

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
      console.log("Notifications: ", this.notifications);
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;

    const notificationDropdown = document.getElementById('notificationDropdown');
    if (notificationDropdown) {
      if (this.showNotifications) {
        notificationDropdown.classList.add('show');
      } else {
        notificationDropdown.classList.remove('show');
      }
    }
  }


  closeNotification(index: number): void {
    this.notifications.splice(index, 1); // Supprime la notification à l'index donné
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
