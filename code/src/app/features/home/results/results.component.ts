import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameInfo, TeamGames } from '../../../shared/models/team-games';
import { ApiService } from '../../../shared/services/api.service';
import { DateService } from '../../../shared/services/date.service';
import { TeamInfo, TeamsList } from '../../../shared/models/teams-list';
import { NbaDataService } from '../../../shared/services/nba-data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{

  teamInfo: TeamInfo | undefined;
  selectedTeamId: number | undefined;
  gamesInfo: GameInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private dateService: DateService,
    private nbaDataService: NbaDataService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedTeamId = +params['teamCode'];

      if(this.selectedTeamId) {
        this.getTeamGamesInfo(this.selectedTeamId);

        // if there are no teams because of a refresh page, than get all teams list again
        if (this.nbaDataService.getAllTeams().length === 0) {
          this.apiService.getTeamsList().subscribe((teams: TeamsList) => {
            if (teams.data.length > 0) {
              this.nbaDataService.setAllTeams(teams.data);
              this.setTeamInfo();
            }
          });
        } else {
          this.setTeamInfo();
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Set the selected Team Info
   */
  setTeamInfo(): void {
    const teamsList: TeamInfo[] = this.nbaDataService.getAllTeams();
    this.teamInfo = teamsList.find((team: TeamInfo) => {
      return team.id == this.selectedTeamId;
    });
  }

  /**
   * Get and set the game scores
   * @param teamId: number
   */
  getTeamGamesInfo(teamId: number): void {
    this.apiService.getGameScoresWithDates(this.dateService.getDatesArrayOfPastXDays(12), teamId).subscribe((teamGames: TeamGames) => {
      this.gamesInfo = teamGames.data;
    });
  }
}
