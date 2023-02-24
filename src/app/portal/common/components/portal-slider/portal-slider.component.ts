import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portal-slider',
  templateUrl: './portal-slider.component.html',
  styleUrls: ['./portal-slider.component.scss']
})
export class PortalSliderComponent  implements OnInit {

  cards!: QueryList<any>;

  public currentPage = 1;
  public pagePosition = '0%';
  public cardsPerPage!: number;
  public totalPages!: number;
  public overflowWidth!: string;
  public cardWidth!: string;
  public containerWidth!: number;

  @ViewChild('container', { static: true, read: ElementRef })
  public container!: ElementRef;

  @HostListener('window:resize')
  public onWindowResize(): void {
    const newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage !== this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit(): void {
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
  }

  private initializeSlider(): void {
    this.totalPages = Math.ceil(this.cards.length / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * 10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage * 10}px) / ${this.cardsPerPage})`;
  }

  private getCardsPerPage(): number {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  public changePage(incrementor: number): void {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  private populatePagePosition(): void {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 * (this.currentPage - 1)}px)`;
  }
}
