import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonSearchbar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService, BoardGame } from '../services/game.service';


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
  ],
})
export class HomePage implements OnInit {
  games: BoardGame[] = [];
  searchTerm: string = '';

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
  //   this.games = [
  //     {
  //       id: 'reload',
  //       title: 'Reload',
  //       description: 'Jogo de porrada',
  //       imageUrl:
  //         'https://conclaveweb.com.br/site/wp-content/uploads/2022/09/Reload-Frente.png',
  //     },
  //     {
  //       id: 'reload',
  //       title: 'Reload',
  //       description: 'Jogo de porrada',
  //       imageUrl:
  //         'https://conclaveweb.com.br/site/wp-content/uploads/2022/09/Reload-Frente.png',
  //     },
  //     {
  //       id: 'reload',
  //       title: 'Reload',
  //       description: 'Jogo de porrada',
  //       imageUrl:
  //         'https://conclaveweb.com.br/site/wp-content/uploads/2022/09/Reload-Frente.png',
  //     },
  //     {
  //       id: 'reload',
  //       title: 'Reload',
  //       description: 'Jogo de porrada',
  //       imageUrl:
  //         'https://conclaveweb.com.br/site/wp-content/uploads/2022/09/Reload-Frente.png',
  //     },
  //     {
  //       id: 'reload',
  //       title: 'Reload',
  //       description: 'Jogo de porrada',
  //       imageUrl:
  //         'https://conclaveweb.com.br/site/wp-content/uploads/2022/09/Reload-Frente.png',
  //     },
  //   ];
    this.gameService.getAllGames().subscribe((games) => {
      this.games = games;
    });
  }

  search() {
    if (this.searchTerm.trim()) {
      console.log('Procurando ' + this.searchTerm);
      this.gameService.searchGames(this.searchTerm).subscribe((games) => {
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
