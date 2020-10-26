import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listactors',
  templateUrl: './listactors.component.html',
  styleUrls: ['./listactors.component.css']
})

export class ListactorsComponent implements OnInit {
  actorsDB: any[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.getActors();
  }

  getActors(){
    this.db.getActors().subscribe((data:any[]) =>{
     this.actorsDB = data;
    })
  }

}
