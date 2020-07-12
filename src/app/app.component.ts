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
  Commerces = [];
  ChartLabels = [];
  ChartData = [];

  // ---------- Configuracion ng2 Chart ----------------
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.ChartLabels;
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    { data: this.ChartData, label: 'Sales' },
  ];
  public lineChartColors: Color[] = [{
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }];

  // ------------ Code ---------------------------------
  constructor(public json: JsonService) {

  }

  ngOnInit() {
    this.json.getJson('https://alw-lab.herokuapp.com/commerces').subscribe((res: any) => {
      res.forEach(element => {
        this.Commerces.push(element);
      });
    });
    this.json.getJson('https://alw-lab.herokuapp.com/commerces/graph').subscribe((data: any) => {
      data.forEach(element => {
        this.ChartLabels.push(element.name);
        this.ChartData.push(element.sales);
      });
    });
  }


}
