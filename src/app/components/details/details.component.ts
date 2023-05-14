import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  loading = true;

  image: Image = {
    date: '',
    url: '',
    title: '',
  };

  private subs: Subscription = new Subscription();

  constructor(private _imageService: ImageService) {
    this.subs = _imageService.data$.subscribe((data: Image) => {
      setTimeout(() => {
        this.loading = false;
        this.image = data;
      }, 1000);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
