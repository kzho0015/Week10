import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ActortomovieComponent } from './actortomovie/actortomovie.component';

const week10Routes: Routes = [
  {path: 'addactor', component: AddactorComponent},
  {path: 'listactors', component: ListactorsComponent},
  {path: "updateactor", component: UpdateactorComponent},
  {path: "deleteactor", component: DeleteactorComponent},
  
  {path: 'addmovie', component: AddmovieComponent},
  {path: 'listmovies', component: ListmoviesComponent},
  {path: 'deletemovie', component: DeletemovieComponent},
  {path: 'addactortomovie', component: ActortomovieComponent},
  {path: '', redirectTo: '/listactors', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    AddmovieComponent,
    ListactorsComponent,
    ListmoviesComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    DeletemovieComponent,
    NotfoundComponent,
    ActortomovieComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(week10Routes, {useHash: true}),
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }

