import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

interface SummaryChartData {
    month: string;
    renewableEnergy: number;
    nonRenewableEnergy: number;
}

@Component({
    selector: 'app-summary',
    standalone: true,
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css'],
    imports: [FormsModule,CommonModule ],
})
export class SummaryComponent implements OnInit {
    summaryData: SummaryChartData[] = [];
    question: string = '';
    response: string = '';
    liveUpdateMessage: string = '';

    predefinedQuestions: { question: string, answer: string }[] = [
      {
        question: "Which month had the highest renewable energy usage?",
        answer: "October had the highest renewable energy usage with 90%.."
      },
      {
        question: 'What is the average renewable energy usage?',
        answer: 'The average renewable energy usage across all months is 80%.'
      },
      {
        question: "Which month had the lowest renewable energy usage?",
        answer: "June had the lowest renewable energy usage with 70%."
      }
      // Add more questions and answers as needed
    ];
    // constructor(private chartDataService: ChartDataService) {}
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.fetchChartData();
    }
      // Fetch chart data from the backend
      fetchChartData(): void {
      this.http.get<SummaryChartData[]>('http://54.196.18.11:3000/api/summary-chart-data')
        .subscribe(
          (data) => {
            this.summaryData = data;
            this.renderChart();
            this.updateLiveNotification('Chart updated with the latest data.');
          },
          (error) => {
            console.error('Error fetching data', error);
          }
        );
    }
    // ngOnInit(): void {
    //     this.chartDataService.getSummaryChartData().subscribe(
    //         (data: SummaryChartData[]) => {
    //             this.summaryData = data;
    //             this.renderChart();
    //             this.updateLiveNotification('Chart updated with the latest data.');

    //         },
    //         (error: any) => {
    //             console.error('Error fetching data:', error);
    //         }
    //     );
    // }

    renderChart(): void {
        const canvas = document.getElementById('summaryChart') as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const chartContext = canvas.getContext('2d') as CanvasRenderingContext2D;
            if (chartContext) {
                new Chart(chartContext, {
                    type: 'bar',
                    data: {
                        labels: this.summaryData.map((d: SummaryChartData) => d.month),
                        datasets: [
                            {
                                label: 'Renewable Energy (%)',
                                data: this.summaryData.map((d: SummaryChartData) => d.renewableEnergy),
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            } else {
                console.error('Failed to get 2D context for canvas.');
            }
        } else {
            console.error('Canvas element not found or does not support getContext.');
        }
    }

  // ADA/WCAG: Function to update the live notification message for real-time feedback
  updateLiveNotification(message: string): void {
    this.liveUpdateMessage = message;

      // Clear message after a delay
    setTimeout(() => {
      this.liveUpdateMessage = '';
    }, 5000);
  }

    // ADA/WCAG: Ask AI Form logic to process user questions and provide real-time responses
    onSubmit(): void {
      if (this.question.trim()) {
        const matchingQuestion = this.predefinedQuestions.find(
          (q) => q.question.toLowerCase() === this.question.trim().toLowerCase()
        );
        if (matchingQuestion) {
          this.response = matchingQuestion.answer;
        } else {
          this.response = "I'm sorry, I don't have an answer to that question.";
        }
      } else {
        this.response = "Please enter a valid question.";
      }
    }
}

// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { ChartDataService } from '../services/chart-data.service';
// import { Chart, registerables } from 'chart.js';
// import { error } from 'console';

// Chart.register(...registerables);
// // import Chart from 'chart.js/auto';

// declare var Chart: any;

// interface SummaryChartData {
//   month: string;
//   renewableEnergy: number;
//   nonRenewableEnergy: number;
// }
// summaryData: SummaryChartData[] = [];

// @Component({
//   selector: 'app-summary',
//   standalone: true,
//   imports: [],
//   templateUrl: './summary.component.html',
//   styleUrl: './summary.component.css'
// })
// export class SummaryComponent implements OnInit, AfterViewInit  {
//   summaryData: SummaryChartData[] = [];

//   constructor(private chartDataService: ChartDataService) {}


//   ngOnInit(): void {
//     this.chartDataService.getSummaryChartData().subscribe(
//       (data: SummaryChartData[]) => {
//         this.summaryData = data;
//         console.log('Fetched Summary Data:', this.summaryData);
//         this.renderChart();
//       },
//       (error: any) => {
//         console.error('Error fetching data:', error);
//         alert('Failed to fetch chart data. Please try again later.');
//       }
//     );
  // }

  // ngAfterViewInit(): void {
  //   this.renderChart();
  // }


//   ngOnInit(): void {
//     fetch('http://localhost:3000/api/summary-chart-data')
//         .then((response) => response.json())
//         .then((data) => {
//             this.summaryData = data;
//             console.log('Fetched Summary Data:', this.summaryData);
//             this.renderChart();
//         })
//         .catch((error) => console.error('Error fetching data:', error));
// }



  // ngOnInit(): void {
  //   // Fetch the chart data from the backend using the service
  //   this.chartDataService.getSummaryChartData().then((data: any[]) => {
  //     this.summaryData = data;
  //     console.log('Fetched Summary Data:', this.summaryData);
  //     this.renderChart();
  //   }


  // renderChart(): void {
  //   const canvas = document.getElementById('summaryChart') as HTMLCanvasElement,
  //   if (canvas: { getContext: (arg0: string) => CanvasRenderingContext2D; }) {
  //     const chartContext = canvas.getContext('2d') as CanvasRenderingContext2D;
  //     if (chartContext) {
  //       new Chart(chartContext, {
  //         type: 'bar',
  //         data: {
  //           labels: this.summaryData.map((d: SummaryChartData) => d.month),
  //           datasets: [
  //             {
  //               label: 'Renewable Energy (%)',
  //               data: this.summaryData.map((d: SummaryChartData) => d.renewableEnergy),
  //               backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //               borderColor: 'rgba(54, 162, 235, 1)',
  //               borderWidth: 1,
  //             },
  //           ],
  //         },
  //         options: {
  //           responsive: true,
  //           scales: {
  //             y: {
  //               beginAtZero: true,
  //             },
  //           },
  //         },
  //       });
  //     } else {
  //       console.error('Failed to get 2D context for canvas.');
  //     }
  //   } else {
  //     console:error('Canvas element not found.'),
  //   }
  // }
