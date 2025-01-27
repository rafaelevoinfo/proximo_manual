import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '../components/pagination.component';

import { IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService, BoardGame } from '../services/game.service';

export class PaginationInfo {
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  pageSize: number = 5;

  reset(): void {
    this.currentPage = 1;
    this.totalPages = 0;
    this.totalItems = 0;
    this.pageSize = 5;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonSearchbar,
    CommonModule,
    FormsModule,
    PaginationComponent,
  ],
})
export class HomePage implements OnInit {
  games: BoardGame[] = [];
  searchTerm: string = '';
  paginationInfo: PaginationInfo = new PaginationInfo();
  errorMessage: string = '';

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGameCount().subscribe((gameInfos) => {
      this.paginationInfo.totalPages = gameInfos.pages;
      this.paginationInfo.totalItems = gameInfos.total;
      this.paginationInfo.pageSize = gameInfos.itemsPerPage;
      this.paginationInfo.currentPage = 1;
    });

    this.loadPage();
  }

  loadPage() {
    this.gameService.getAllGames(this.paginationInfo.currentPage).subscribe((games) => {
      this.games = games;
    });
  }

  onPageChange(page: any) {
    this.paginationInfo.currentPage = page;
    this.loadPage();
  }

  search() {
    if (this.searchTerm.trim()) {
      console.log('Procurando ' + this.searchTerm);
      this.gameService.searchGames(this.searchTerm).subscribe((games) => {
        this.paginationInfo.reset();
        this.games = games;
      });
    } else {
      this.loadGames();
    }
  }

  openChat(gameId: string) {
    console.log(`Clicked ${gameId}`);
    this.router.navigate(['/chat', gameId]);
  }
}
