import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { TeamInfo, TeamsList } from '../../../shared/models/teams-list';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameInfo, TeamGames } from '../../../shared/models/team-games';
import { DateService } from '../../../shared/services/date.service';
import { TrackedTeam } from '../../../shared/models/tracked-team';
import { NbaDataService } from '../../../shared/services/nba-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectTeamForm: FormGroup | undefined;
  teamsList: TeamInfo[] | undefined;
  idsTrackedTeams: number[] = [];
  trackedTeams: TrackedTeam[] = [];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private nbaDataService: NbaDataService
  ) {
  }

  ngOnInit() {
    this.selectTeamForm = this.formBuilder.group({
      selectedTeam: [null]
    });
    this.getAllTeams();
  }

  /**
   * Get the List of all Teams and assign it to the local variable "teamsList"
   */
  getAllTeams(): void {
    if (this.nbaDataService.getAllTeams().length === 0) {
      this.apiService.getTeamsList().subscribe((teams: TeamsList) => {
        if (teams.data.length > 0) {
          this.teamsList = teams.data;
          this.nbaDataService.setAllTeams(this.teamsList);
        }
      });
    } else {
      this.teamsList = this.nbaDataService.getAllTeams();
      this.trackedTeams = this.nbaDataService.getTrackedTeams();
      this.idsTrackedTeams = this.nbaDataService.getIdsTrackedTeams();
    }
  }

  /**
   * Set a new Team to Track
   */
  trackTeam(): void {
    const idSelectedTeam: number = this.selectTeamForm!.value.selectedTeam;
    this.idsTrackedTeams.push(idSelectedTeam);
    this.nbaDataService.setIdsTrackedTeams(this.idsTrackedTeams);
    this.getTeamGamesInfo(idSelectedTeam);
  }

  /**
   * Get Game Scores for the selected Team and by setting past 12 days for the research
   * @param teamId: number
   */
  getTeamGamesInfo(teamId: number): void {
    this.apiService.getGameScoresWithDates(this.dateService.getDatesArrayOfPastXDays(12), teamId).subscribe((teamGames: TeamGames) => {
      this.addNewTeamTracked(+teamId, teamGames.data);
    });
  }

  /**
   * Add the team scores + info to the array of all tracked teams
   * @param teamId: number
   * @param teamGames: GameInfo[]
   */
  addNewTeamTracked(teamId: number, teamGames: GameInfo[]): void {
    this.trackedTeams.push(
      {
        team: this.teamsList!.find((team: TeamInfo ) => {
          return team.id === teamId;
        })!,
        games: teamGames
      }
    );
    this.nbaDataService.setTrackedTeams(this.trackedTeams);
  }

  /**
   * Remove Team from Tracked ones
   * @param teamId: number
   */
  removeFromTrackedTeams(teamId: number): void {
    this.trackedTeams = this.trackedTeams.filter((team: TrackedTeam) => {
      return team.team.id !== teamId;
    });
    this.idsTrackedTeams = this.idsTrackedTeams.filter((id: number) => id != teamId);

    this.nbaDataService.setTrackedTeams(this.trackedTeams);
    this.nbaDataService.setIdsTrackedTeams(this.idsTrackedTeams);
  }

  /**
   * Check if team is already tracked. This is needed for the Select to disabled selected teams
   * @param teamId: number
   */
  isAlreadySelected(teamId: number): boolean {
    return !!this.idsTrackedTeams.find((id: number) => id == teamId);
  }
}
