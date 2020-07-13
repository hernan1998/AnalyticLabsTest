import { Component, OnInit } from '@angular/core';
import { JsonService } from './json.service';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AnalyticLabTest';

  // ----------- Variables -----------------------------
  ChartLabels = [];
  ChartData = [];

  // ---------- Configuracion ng2 Chart ----------------
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.ChartLabels;
  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartData = [
    { data: this.ChartData, label: 'Sales' },
  ];
  public lineChartColors: Color[] = [{
    backgroundColor: 'rgb(184,218,255,0.8)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointHoverBackgroundColor: '#ffffff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }];

  // ------------ Code ---------------------------------
  constructor(public json: JsonService) {

  }

  ngOnInit() {
    this.json.getJson('https://alw-lab.herokuapp.com/commerces/graph').subscribe((data: any) => {
      data.forEach(element => {
        this.ChartLabels.push(element.name);
        this.ChartData.push(element.sales);
      });
    });
  }


}
