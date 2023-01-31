import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TeamInfo } from '../../models/teams-list';
import { GameInfo } from '../../models/team-games';
import { BASE_URL_LOGOS } from '../../config/config.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit, OnChanges{

  @Input() teamInfo: TeamInfo | undefined;
  @Input() gamesScores: GameInfo[] | undefined;
  @Input() showGamesScore: boolean = false;
  @Output() onNotTrackTeamEmitter: EventEmitter<number> = new EventEmitter<number>();

  winLoseGames: string[] = [];
  avgPointsScored: number = 0;
  avgPointsConceded: number = 0;

  LOGO_URL: string = BASE_URL_LOGOS;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges != null) {
      if (simpleChanges['gamesScores'] != null && simpleChanges['gamesScores'].currentValue != null) {
        this.calculatePointsAndWinLose();
      }
      if (simpleChanges['teamInfo'] != null && simpleChanges['teamInfo'].currentValue != null) {
        this.teamInfo = simpleChanges['teamInfo'].currentValue;
      }
    }
  }

  /**
   * Calculate the average point scored/conceded and all win/lost games
   */
  calculatePointsAndWinLose(): void {
    let pointsScored: number = 0;
    let pointsConceded: number = 0;
    this.gamesScores?.forEach((game: GameInfo) => {
      if (this.teamInfo?.id === game.home_team.id) {
        pointsScored += game.home_team_score;
        pointsConceded += game.visitor_team_score;
        this.winLoseGames.push(game.home_team_score > game.visitor_team_score ? 'W' : 'L');
      } else {
        pointsScored += game.visitor_team_score;
        pointsConceded += game.home_team_score;
        this.winLoseGames.push(game.visitor_team_score > game.home_team_score ? 'W' : 'L');
      }
    });
    this.avgPointsScored = Math.round(pointsScored/this.gamesScores!.length);
    this.avgPointsConceded = Math.round(pointsConceded/this.gamesScores!.length);
  }

  /**
   * Do not track the team anymore
   * @param teamId: number
   */
  notTrackTeam(teamId: number): void {
    this.onNotTrackTeamEmitter.emit(teamId);
  }

  /**
   * Go to the page of results
   * @param teamId: number
   */
  seeGameResults(teamId: number): void {
    this.router.navigate(['results', teamId]);
  }

  /**
   * Go back to the tracked teams page
   */
  goBackAllTeams(): void {
    this.router.navigate(['']);
  }
}
