import { ICharacterInfo, ILocationInfo } from 'src/app/interfaces/ICharacterResponse';
import { HttpService } from './../../shared/services/http-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  characterInfo: ICharacterInfo | null = null;
  locationInfo: ILocationInfo | null = null;
  route = inject(ActivatedRoute);
  isLoading = false;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];
    this.httpService.getCharacterById<ICharacterInfo>(Number(id)).subscribe({
      next: (data) => {
        this.characterInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
