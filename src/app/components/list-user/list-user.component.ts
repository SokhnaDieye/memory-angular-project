import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
    @Input()
    users: User[] = [];
    selectedUser!: User;
    constructor(private userService: AuthService,private http: HttpClient) {
        this.loadUsers();
    }

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

    // suppression user
    loadUsers(): void {
        this.userService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }

    // Fonction appelée lorsqu'on clique sur le bouton de suppression
    deleteUser(userId: number): void {
        // SweetAlert pour confirmation
        Swal.fire({
            title: "Confirmation?",
            text: "Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer!",
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                // Si l'utilisateur confirme la suppression, on fait appel à l'API
                this.userService.deleteUser(userId).subscribe({
                    next: (response) => {
                        // Notification de succès avec SweetAlert
                        Swal.fire({
                            title: "Supprimé!",
                            text: "L'utilisateur a été supprimé avec succès.",
                            icon: "success"
                        });
                        // Actualiser la liste des utilisateurs après la suppression
                        this.loadUsers();
                    },
                    error: (error) => {
                        // Notification d'erreur avec SweetAlert
                        Swal.fire({
                            title: "Erreur!",
                            text: "Il y a eu une erreur lors de la suppression de l'utilisateur.",
                            icon: "error"
                        });
                    }
                });
            } else {
                // L'utilisateur a annulé la suppression
                Swal.fire({
                    title: "Annulé",
                    text: "La suppression de l'utilisateur a été annulée.",
                    icon: "info"
                });
            }
        });
    }

// Fonction pour ouvrir le modal avec l'utilisateur sélectionné
    openEditModal(user: User): void {
        this.selectedUser = user;
    }
}
