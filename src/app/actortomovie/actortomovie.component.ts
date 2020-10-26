import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actortomovie',
  templateUrl: './actortomovie.component.html',
  styleUrls: ['./actortomovie.component.css']
})

export class ActortomovieComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  fullName = '';
  title = '';

  constructor(private db: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    this.getActors();
    this.onGetMovies();
  }

  actorToMovie() {
    const obj = {title: this.title, name: this.fullName};
    this.db.addActor(obj).subscribe(result => {
      this.router.navigate(['/listmovies']);
    });
  }

  onGetMovies(){
    this.db.getMovies().subscribe((data:any[]) =>{
     this.moviesDB = data;
    })
  }

  getActors(){
    this.db.getActors().subscribe((data:any[]) =>{
     this.actorsDB = data;
    })
  }

}

