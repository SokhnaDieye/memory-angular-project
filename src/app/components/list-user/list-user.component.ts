import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: AuthService) {}

    ngOnInit(): void {
        this.userService.getUsers().subscribe(
            (data: User[]) => {
                console.log(data);
                this.users = data.filter((user: User) => user.role !== "SeniorManager");
            },
            error => {
                console.error('Erreur lors de la récupération des utilisateurs', error);
            }
        );

    }
}
