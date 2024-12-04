import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import { Chart, registerables as registerable } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerable);
// // import Chart from 'chart.js/auto';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  reportData: any[] = [];
  question: string = '';
  response: string = '';
  liveUpdateMessage: string = '';


 // Predefined questions and answers
 predefinedQuestions: { question: string; answer: string }[] = [
  { question: 'Which country has the highest energy mix?', answer: 'Denmark has the highest energy mix in this dataset.' },
  { question: 'Which country has the lowest energy mix?', answer: 'Iceland has the lowest energy mix in this dataset.' },
  { question: 'What is the average energy mix?', answer: 'The average energy mix across all countries is 75%.' }
];

  // constructor(private chartDataService: ChartDataService) {}
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReportChartData();
  }

  fetchReportChartData(): void {
    this.http.get<{ country: string; wind: number; solar: number; hydro: number }[]>(
      'http://localhost:3000/api/report-chart-data'
    ).subscribe(
      (data) => {
        this.reportData = data;
        console.log('Report Data:', this.reportData);
        this.renderPieChart();
        this.updateLiveNotification('Chart updated with the latest data.');
      },
      (error) => {
        console.error('Error fetching report data:', error);
      }
    );
  }

  //   this.chartDataService.getReportChartData().subscribe((data:any[]) => {
  //     this.reportData = data;
  //     console.log('Report Data:', this.reportData);
  //     this.renderPieChart();
  //     this.updateLiveNotification('Chart updated with the latest data.');
  //   });
  // }

  // ADA/WCAG: Function to update the live notification message for real-time feedback
 // Function to update the live notification message
 updateLiveNotification(message: string): void {
  this.liveUpdateMessage = message;

  // Optionally clear the message after a short delay for clarity
  setTimeout(() => {
    this.liveUpdateMessage = '';
  }, 5000);
}

// ADA/WCAG: Ask AI Form logic to process user questions and provide real-time responses
  onSubmit(): void {
    const predefinedAnswer = this.predefinedQuestions.find(
      (q) => q.question.toLowerCase() === this.question.trim().toLowerCase()
    );
    if (predefinedAnswer) {
      this.response = predefinedAnswer.answer;
    } else {
      this.response = 'I’m sorry, I do not have an answer to your question at the moment.';
    }
  }














  // export class ReportsComponent {
  //   constructor(private authService: AuthService) {}

  //   ngOnInit() {
  //       this.authService.getEnergyMixData().subscribe((data) => {
  //           this.createPieChart(data);
  //       });
  //   }
//}

renderPieChart(): void {
  // Get the canvas element by ID
  // const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
  const canvas = document.getElementById('reportChart') as HTMLCanvasElement;
  if (canvas) {
      const chartContext = canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  // Ensure the canvas context is available

  // if (ctx) {
  //   const chartContext = ctx.getContext('2d') as CanvasRenderingContext2D;

 // Get the 2D context from the canvas
 const chartContext = canvas.getContext('2d') as CanvasRenderingContext2D;
 if (!chartContext) {
     console.error('Unable to get 2D context');
     return;
 }

    // Create the Chart.js pie chart
    new Chart(chartContext, {
      type: 'pie', // Pie chart type
      data: {
        labels: this.reportData.map((d: any) => d.country), // Labels for each country
        datasets: [
          {
            label: 'Energy Mix by Country',
            data: this.reportData.map((d: any) => d.wind), // Data points
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#4BC0C0', // Teal
              '#9966FF', // Purple
              '#FF9F40', // Orange
              '#C9CBCF', // Grey
              '#FFCD94', // Light Orange
            ],
            borderColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#C9CBCF',
              '#FFCD94',
            ],
            borderWidth: 1, // Border width
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // Position of the legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
        },
      },
    });
  }
}

