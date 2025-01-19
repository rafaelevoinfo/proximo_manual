import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export interface BoardGame {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAllGames(): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(`${this.baseApiUrl}/api/list-games`, {
      headers: this.getCustomHeaders(),
    });
  }

  searchGames(gameId: string): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>(`${this.baseApiUrl}/api/list-games?gameId=${gameId}`, {
      headers: this.getCustomHeaders(),
    });
  }
}
