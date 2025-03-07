import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule, IonIcon, IonButton, IonCard, IonCardContent, IonIcon, IonButton],
  template: `
    <ion-card *ngIf="errorMessage" class="error-card">
      <ion-card-content>
        <ion-icon name="alert-circle-outline"></ion-icon>
        <p>{{ errorMessage }}</p>
        <ion-button fill="clear" (click)="errorMessage = ''">
          <ion-icon name="close-outline"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      .error-card {
        margin: 16px;
        background-color: #fff5f5;
        border-left: 4px solid #dc3545;

        ion-card-content {
          display: flex;
          align-items: center;
          padding: 12px;

          ion-icon {
            font-size: 24px;
            color: #dc3545;
            margin-right: 12px;
          }

          p {
            flex: 1;
            margin: 0;
            color: #dc3545;
          }

          ion-button {
            --color: #dc3545;
          }
        }
      }
    `,
  ],
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
}
