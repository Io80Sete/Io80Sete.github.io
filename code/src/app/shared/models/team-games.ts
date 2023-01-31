import { TeamInfo } from './teams-list';

export interface TeamGames {
  data: GameInfo[];
  meta: MetaGames;
}

export interface GameInfo {
  id: number;
  date: Date;
  home_team: TeamInfo;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: TeamInfo;
  visitor_team_score: number;
}

export interface MetaGames {
  total_pages: number;
  current_page: number;
  next_page?: number;
  per_page: number;
  total_count: number;
}
