import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export interface BoardGame {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GameCount {
  total: number;
  pages: number;
  itemsPerPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getAllGames(pageNumber: number): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(
      `${this.baseApiUrl}/list-games?page=${pageNumber}`
    );
  }

  searchGames(gameTitle: string): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(
      `${this.baseApiUrl}/list-games?gameTitle=${gameTitle}`
    );
  }

  getGame(gameId: string): Observable<BoardGame> {
    return this.http.get<BoardGame>(`${this.baseApiUrl}/get-game/${gameId}`);
  }

  getGameCount(): Observable<GameCount> {
    return this.http.get<GameCount>(`${this.baseApiUrl}/count-games`);
  }
}
