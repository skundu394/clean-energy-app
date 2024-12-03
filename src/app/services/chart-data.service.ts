import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



interface SummaryChartData {
  month: string;
  renewableEnergy: number;
  nonRenewableEnergy: number;
}

interface ReportChartData {
  country: string;
  wind: number;
  solar: number;
  hydro: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private apiUrl = 'http://localhost:3000/api';
  private summaryChartUrl = `${this.apiUrl}/summary-chart-data`;
  private reportChartUrl = `${this.apiUrl}/report-chart-data`;

  constructor(private http: HttpClient) {}

  // Method to fetch data for the Summary page
  getSummaryChartData(): Observable<SummaryChartData[]> {
    return this.http.get<SummaryChartData[]>(this.summaryChartUrl);
  }

  // Method to fetch data for the Reports page
  getReportChartData(): Observable<ReportChartData[]> {
    return this.http.get<ReportChartData[]>(this.reportChartUrl);
  }
}
