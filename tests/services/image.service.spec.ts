import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ImageService } from '../../src/app/services/image.service';
import { Image } from 'src/app/models/Image';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { map } from 'rxjs';

describe('ImageService', () => {
  let service: ImageService;
  let dashboard: DashboardComponent;
  let details: DetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ImageService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('url should be ok', () => {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    const url = service.getImage(date.toLocaleDateString('fr-CA'));

    url.subscribe((data) => {
      expect(data).toBe(dashboard.listImages);
    });
  });

  test('should get 6 images', () => {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    service.getImage(date.toLocaleDateString('fr-CA')).subscribe((data) => {
      expect(data.length).toBe(dashboard.listImages.length);
    });
  });

  test('should get data from a component to other', () => {
    let image: Image = {
      date: '2023-05-13',
      url: 'https://apod.nasa.gov/apod/image/2305/AS17-152-23420_Ord1024c.jpg',
      title: 'Apollo 17: The Crescent Earth',
    };

    let date = new Date();
    date.setDate(date.getDate() - 5);
    service
      .getImage(date.toLocaleDateString('fr-CA'))
      .pipe(
        map((data, i) => {
          data.setData(image);
          expect(details.image).toBe(dashboard.listImages[i]);
        })
      )
      .subscribe();
  });
});
