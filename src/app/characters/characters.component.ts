import { Component,OnInit } from '@angular/core';
import {CharactersApiService} from './character/shared/characters-api.service';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Comic } from './comic';



@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10, // Set your desired number of items per page
    currentPage: 1,  // Set the initial page
  };
  characters: any[];
  series:any[];
  currentPage: number=1;
  pageSize: number = 10;
  totalPages: number = 0; 
  maxPagesToShow:number =0;
  allCharacters:Observable<any>;
  totalCharacters: number;
  page: number = 1;
  orderby: string;
  selectedComic: any;
  comicid:number;
  comic: any;
  searchValue: string = '';
  comicDescription:string;
  comicActive:Comic;
  comictitle:string='';
  comicthumbnail:string='';
  comicextension:string='';
  comicList:Comic[]=[];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
    
  });
  variable1: any;

  constructor(private characterSvc:CharactersApiService, private router: Router, private fb: FormBuilder){
  this.comicActive={
    title: '',
    comicthumbnail:'',
    comicextension:'',
    description:''


  }
  }
  

  ngOnInit(): void {
    this.getCharactersInit(this.currentPage);
    this.calculateTotalPages();
  }

  getSelectedValue(order: string){
    // Prints selected value
    this.characterSvc.getCharacters(this.currentPage,order).subscribe((data: any) => {
      this.characters = data.data.results;
      this.totalCharacters = data.data.total;
    });
  }

  getCharactersInit(page: number){
    this.characterSvc.getCharactersInit(page).subscribe((data: any) => {
      this.characters = data.data.results;
      this.totalCharacters = data.data.total;
    });
  }
  getCharacters(page: number, orderBy? :string){
    this.characterSvc.getCharacters(page,orderBy).subscribe((data: any) => {
      this.characters = data.data.results;
      this.totalCharacters = data.data.total;
    });
  }


  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getCharacters(this.currentPage,this.orderby);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalCharacters / this.pageSize);
    this.maxPagesToShow = Math.ceil(this.totalCharacters / this.pageSize);
  }


  viewCharacterDetail(id: number) {
    this.router.navigate(['/characterdetail', id]);
  }

  openComicModal(comics: any){
    let url = comics.resourceURI;
    let urlSegments = url.split('/');
    let lastSegment = urlSegments[urlSegments.length - 1];
    let match = lastSegment.match(/\d+/);
    this.comicid= match;
    this.loadComicDetail(this.comicid);

    
  
  }


  onSearchSubmit():void{
    this.searchValue = this.searchForm.value.searchValue ?? '';
    if(this.searchValue !=''){
      
      this.characterSvc.getCharactersByName(this.searchValue).subscribe((data: any) => {
        this.characters = data.data.results;
        this.totalCharacters = data.data.total;
      });
    }else
    {
      this.getCharacters(this.currentPage);
    }
  }

  loadComicDetail(comicId:number){
    this.characterSvc.getComicById(comicId).subscribe((response)=> {
      this.comic = response.data.results[0];
      this.comicDescription = response.data.results[0].description;
      this.comictitle = response.data.results[0].title;

      this.comicActive.title = response.data.results[0].title;
      this.comicActive.comicthumbnail = response.data.results[0].thumbnail.path;
      this.comicActive.comicextension = response.data.results[0].thumbnail.extension;
      this.comicActive.description = response.data.results[0].description;
      // Assuming the API returns a single character
    });
    

  }

  sendComic(){
    const copyOfComicActive = { ...this.comicActive };
    this.comicList.push(copyOfComicActive);
    console.log(this.comicList);
  }

  removeComic(index: number) {
    this.comicList.splice(index, 1); // Remove the comic at the given index
  }

  viewCharacterMovies(idCharacter:number){
      this.getComicsbyCharacerId(idCharacter);
      console.log(this.series)
  }
  getComicsbyCharacerId(idCharacter:number){
    this.characterSvc.getSeriesByCharacterId(idCharacter).subscribe((data: any) => {
      this.series = data.data.results;
    
    });
  }
}
