import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

const appName: string = 'NBA Score Tracking';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: `Home - ${appName}`
  },
  {
    path: 'results/:teamCode',
    component: ResultsComponent,
    title: `Results - ${appName}`
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
