import { Injectable } from '@angular/core';
import { TeamInfo } from '../models/teams-list';
import { TrackedTeam } from '../models/tracked-team';

@Injectable({
  providedIn: 'root'
})
export class NbaDataService {

  private allTeams: TeamInfo[] = [];
  private trackedTeams: TrackedTeam[] = [];
  private idsTrackedTeams: number[] = [];

  constructor() { }

  getAllTeams(): TeamInfo[] {
    return this.allTeams;
  }

  setAllTeams(teams: TeamInfo[]): void {
    this.allTeams = teams;
  }

  getTrackedTeams(): TrackedTeam[] {
    return this.trackedTeams;
  }

  setTrackedTeams(teams: TrackedTeam[]): void {
    this.trackedTeams = teams;
  }

  getIdsTrackedTeams(): number[] {
    return this.idsTrackedTeams;
  }

  setIdsTrackedTeams(ids: number[]): void {
    this.idsTrackedTeams = ids;
  }
}
