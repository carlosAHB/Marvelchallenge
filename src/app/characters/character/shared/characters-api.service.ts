import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MD5 } from 'crypto-js'; 


@Injectable({
  providedIn: 'root'
})

export class CharactersApiService {


  private baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  private comicUrl = 'https://gateway.marvel.com:443/v1/public/comics';
  private publicKey = '46f9a9c34885b3620fa0ff8f37096a15';
  private privateKey = 'ed46352f6c5eca0c76e1913fad09a424d90183c2';
  constructor(private http: HttpClient) {}

  // Custom MD5 hash function

  getCharacters(page: number = 1,orderBy?:string ): Observable<any> {
    const timestamp = Date.now().toString();
    const offset = (page - 1) * 10;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

      let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash)
      .set('offset', offset.toString())
      .set('limit', '10');

     if (orderBy) {
        params = params.set('orderBy', orderBy);
      }

    return this.http.get(this.baseUrl, { headers, params });
    
  }

  getCharactersInit(page: number = 1): Observable<any> {
    const timestamp = Date.now().toString();
    const offset = (page - 1) * 10;
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

      let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash)
      .set('offset', offset.toString())
      .set('limit', '10');

    return this.http.get(this.baseUrl, { headers, params });
    
  }

  getCharacterById(characterId: number): Observable<any> {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash);

    const characterUrl = `${this.baseUrl}/${characterId}`;
    
    return this.http.get(characterUrl, { headers, params });
  }

  getCharactersByName(characterName: string): Observable<any> {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

      let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash)
      .set('limit', '10')
      .set('nameStartsWith',characterName.toString());

      const characterUrl = `${this.baseUrl}/${characterName}`;
    
      return this.http.get(this.baseUrl, { headers, params });
   
  }

  getComicById(comicId: number): Observable<any> {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });



      let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash)
     
      const comictrUrl = `${this.comicUrl}/${comicId}`;
    
      return this.http.get(comictrUrl, { headers, params });
   
  }

  getSeriesByCharacterId(characterId: number): Observable<any> {
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', this.publicKey)
      .set('hash', hash);

    const characterUrl = `${this.baseUrl}/${characterId}/series`;
    
    return this.http.get(characterUrl, { headers, params });
  }



  
}
