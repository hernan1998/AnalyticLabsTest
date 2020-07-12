import { Component, OnInit } from '@angular/core';
import { JsonService } from '../../json.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // ----------- Variables -----------------------------
  Commerces = [];


  constructor(public json: JsonService) { }

  ngOnInit(): void {
    // Llamado GET a la api /commerces
    this.json.getJson('https://alw-lab.herokuapp.com/commerces').subscribe((res: any) => {
      res.forEach(element => {
        this.Commerces.push(element);
      });
    });
  }

}
