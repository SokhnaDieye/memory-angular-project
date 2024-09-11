import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createCharts();
  }

  createCharts(): void {
    // Graphique en aires
    const ctxArea = document.getElementById('myAreaChart') as HTMLCanvasElement;
    new Chart(ctxArea, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Achèvement du projet',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
              }
            }
          }
        }
      }
    });

    // Graphique en barres
    const ctxBar = document.getElementById('myBarChart') as HTMLCanvasElement;
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Achèvement du milestones',
          data: [10, 15, 8, 12, 5, 6, 3],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }
}
