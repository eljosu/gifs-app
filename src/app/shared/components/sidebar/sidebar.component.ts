import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor ( private gifsService: GifsService) {}

  //Mi solucion
  // searchHistory() {
  //   let tagsElements: string[]= this.gifsService.tagsHistory;
  //   return tagsElements;

  // }

  //Solucion de Fernando

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  historyTag(oldTag: string) {
    this.gifsService.searchTag(oldTag);
  }
}

