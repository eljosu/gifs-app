
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs"
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
    `
})
//Sin usar ViewChild
// (keyup.enter)="searchTag(txtTagInput.value)"

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //taginput! es Non Null Operator. Siempre va a haber tagInput

  constructor( private gifsService: GifsService) {}

  searchTag() {
    const newTag= this.tagInput.nativeElement.value;

  // searchTag( newTag: string) {
    console.log(newTag);

    this.gifsService.searchTag( newTag );

    this.tagInput.nativeElement.value= '';
  }


}
