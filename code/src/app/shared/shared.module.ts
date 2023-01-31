import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './services/api.service';
import { NbaDataService } from './services/nba-data.service';

import { TeamCardComponent } from './components/team-card/team-card.component';

@NgModule({
  declarations: [TeamCardComponent],
  exports: [
    TeamCardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    NbaDataService
  ]
})
export class SharedModule { }
