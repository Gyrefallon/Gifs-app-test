import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @ViewChild('textClickInput')
  public tagClickInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService:GifsService) {

  }
  get tags(){
    return this.gifsService.tagsHistory;
  }

  clickTagSearch(tag:string):void{
    this.gifsService.searchTag(tag)
  }
}
