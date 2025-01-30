import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';

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
  IonInput, IonSpinner } from '@ionic/angular/standalone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, MessagesDTO } from '../services/chat.service';
import { BoardGame, GameService } from '../services/game.service';

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
    IonIcon
  ],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInput) messageInput: IonInput;
  messages: MessagesDTO;
  game: BoardGame;
  thinking: boolean;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    var gameId = this.route.snapshot.paramMap.get('id');
    this.startChat(gameId ?? '');
  }

  startChat(gameId: string) {
    this.messages = {
      gameId: gameId,
      messages: [],
      filesData: [],
      gameRulesCacheName: '',
    };
    this.chatService.startChat(gameId).subscribe((cacheName) => {
      this.messages.gameRulesCacheName = cacheName;
    });
    this.gameService.searchGames(gameId).subscribe((game) => {
      this.game = game[0];
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
      this.chatService.sendMessage(this.messages).subscribe((response) => {
        this.thinking = false;
        this.messages.messages.push({
          role: 'model',
          parts: [{ text: response }],
        });
        this.scrollToBottom();
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


