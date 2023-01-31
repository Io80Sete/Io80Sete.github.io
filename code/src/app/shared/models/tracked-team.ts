import { TeamInfo } from './teams-list';
import { GameInfo } from './team-games';

export interface TrackedTeam {
  team: TeamInfo;
  games: GameInfo[];
}
