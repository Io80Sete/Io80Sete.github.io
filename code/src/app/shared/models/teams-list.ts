export interface TeamsList {
  data: TeamInfo[];
  meta: MetaTeams;
}

export interface TeamInfo {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface MetaTeams {
  total_pages: number;
  current_page: number;
  next_page?: number;
  per_page: number;
  total_count: number;
}
