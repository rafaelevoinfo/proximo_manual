import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';
import { ErrorComponent } from '../components/error.component';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonFooter,
  IonItem,
  IonIcon,
  IonInput,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, MessagesDTO } from '../services/chat.service';
import { BoardGame, GameService } from '../services/game.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonItem,
    IonIcon,
    ErrorComponent,
  ],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInput) messageInput: IonInput;
  messages: MessagesDTO;
  game:BoardGame;
  thinking: boolean;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    var gameId = this.route.snapshot.paramMap.get('id');
    this.loadGame(gameId ?? '');
  }

  loadGame(gameId: string) {
    this.messages = {
      gameId: gameId,
      messages: [],
      filesData: [],
      gameRulesCacheName: '',
    };

    this.gameService.getGame(gameId).subscribe({
      next: (game) => {
        this.game = game;
        this.startChat(gameId);
      },
      error: (error) => {
        this.errorMessage = 'Não foi possível encontrar o jogo';
      },
    });
  }

  startChat(gameId: string) {
    this.chatService.startChat(gameId).subscribe({
      next: (cacheName) => {
        this.messages.gameRulesCacheName = cacheName;
      },
      error: (error) => {
        this.errorMessage = 'Não foi possível iniciar o chat.';
      },
    });
  }

  sendMessage(newMessage: any) {
    if (newMessage.trim()) {
      this.thinking = true;
      this.messages.messages.push({
        parts: [{ text: newMessage }],
        role: 'user',
      });
      this.scrollToBottom();
      this.chatService.sendMessage(this.messages).subscribe({
        next: (response) => {
          this.thinking = false;
          this.messages.messages.push({
            role: 'model',
            parts: [{ text: response }],
          });
          this.scrollToBottom();
        },
        error: (error) => {
          this.thinking = false;
          this.errorMessage = 'Erro ao comunicar com a I.A.';
        },
      });
    }
    this.messageInput.value = '';
  }

  convertToHtml(text: string): string {
    return marked(text, { async: false });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);
  }
}
