import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

export interface FileDataDTO {
  mimeType: string;
  fileUri: string;
}

export interface PartDTO {
  text: string;
}

export interface MessageDTO {
  parts: PartDTO[];
  role: string;
}

export interface MessagesDTO {
  gameId: string;
  messages: MessageDTO[];
  filesData: FileDataDTO[];
  gameRulesCacheName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  startChat(gameId: string): Observable<string> {
    return this.http.post<string>(`${this.baseApiUrl}/start-chat/${gameId}`, null);
  }

  sendMessage(message: MessagesDTO): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/chat`, message, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
