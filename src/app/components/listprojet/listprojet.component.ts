import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listprojet',
  templateUrl: './listprojet.component.html',
  styleUrls: ['./listprojet.component.css']
})
export class ListprojetComponent implements OnInit{

  projects: any[] = [];

  constructor(private router: Router,private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }
  openProjectDetails(projectId: number) {
    this.router.navigate(['/detailsProjet', projectId]);
  }
  getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
