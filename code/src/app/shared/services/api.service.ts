import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TeamsList } from '../models/teams-list';
import {
  BASE_URL_REQUEST,
  GET_ALL_TEAMS_ENDPOINT,
  GET_GAME_SCORE_ENDPOINT,
  RAPID_API_HOST,
  RAPID_API_KEY
} from '../config/config.constants';
import { TeamGames } from '../models/team-games';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get the List of NBA Teams
   */
  public getTeamsList(): Observable<TeamsList> {
    const path: string = BASE_URL_REQUEST + GET_ALL_TEAMS_ENDPOINT;

    return this.httpClient.get<TeamsList>(
      `${path}`, {
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_API_HOST}
      }).pipe(
      map((responseTeamsListAPI: TeamsList) => {
        return responseTeamsListAPI;
      }),
    );
  }

  /**
   * Get the Game Info for games that were played in the "dates" array
   * @param dates: string[]
   * @param teamId: number
   */
  public getGameScoresWithDates(dates: string[], teamId: number): Observable<TeamGames> {
    const path: string = BASE_URL_REQUEST + GET_GAME_SCORE_ENDPOINT;
    let params: HttpParams = new HttpParams();

    params = params.set('page', 0);
    dates.forEach((gameDate: string) => {
      params = params.append('dates[]', gameDate);
    });
    params = params.append('per_page', 12);
    params = params.append('team_ids[]', teamId);

    console.log('Param List: ', params);

    return this.httpClient.get<TeamGames>(
      `${path}`, {
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': RAPID_API_HOST},
        params: params
      }).pipe(
      map((responseGameScoresAPI: TeamGames) => {
        return responseGameScoresAPI;
      }),
    );
  }
}
