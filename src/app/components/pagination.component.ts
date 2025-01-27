// pagination.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-pagination',
  imports: [IonGrid, IonRow, IonCol, IonText, IonIcon, IonButtons, IonButton],
  template: `
    <ion-grid [class]="totalItems < pageSize ? 'ion-hide' : ''">
      <ion-row class="ion-justify-content-center">
        <ion-col size="auto">
          <ion-buttons>
            <ion-button
              (click)="onPageChange(currentPage - 1)"
              [disabled]="currentPage === 1"
            >
              <ion-icon name="chevron-back"></ion-icon>
            </ion-button>

            @for (page of visiblePages; track page; let index = $index) {
            <ion-button
              [color]="page === currentPage ? 'primary' : 'medium'"
              (click)="onPageChange(page)"
            >
              {{ page }}
            </ion-button>
            }

            <ion-button
              (click)="onPageChange(currentPage + 1)"
              [disabled]="currentPage === totalPages"
            >
              <ion-icon name="chevron-forward"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 5;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const totalVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(totalVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + totalVisiblePages - 1);

    if (endPage - startPage + 1 < totalVisiblePages) {
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
