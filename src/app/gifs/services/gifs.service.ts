import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = '7RdUBdRDr9cBZgFEnfpzdiErst5BHKsK'

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[]=[];
  private apiKey:string = '7RdUBdRDr9cBZgFEnfpzdiErst5BHKsK';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs'

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
   }
  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter((oldTag)=> oldTag!==tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory= this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('History', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('History')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('History')!);
  }

  get tagsHistory() {
      return [...this._tagsHistory];
    }
    searchTag(tag:string):void{
      if (tag.length === 0) return;
      this.organizeHistory(tag);

      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 20)
      .set('q',tag)

      this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe((res)=>{
        this.gifList = res.data;
      })


    }
}
