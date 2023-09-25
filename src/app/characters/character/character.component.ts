import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CharactersApiService} from '../character/shared/characters-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: any;
  constructor(
    private route: ActivatedRoute,
    private characterSvc:CharactersApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const characterId = +params['id']; // Get the character ID from the route parameter
      this.loadCharacterDetail(characterId);
    });
  }

  loadCharacterDetail(characterId: number) {
    this.characterSvc.getCharacterById(characterId).subscribe((data: any)=> {
      this.character = data.data.results[0]; // Assuming the API returns a single character
    });
  }
  goBack() {
    this.router.navigate(['/'], { relativeTo: this.route, skipLocationChange: true, replaceUrl: false, state: { navigationId: -1 } });
  }
}
