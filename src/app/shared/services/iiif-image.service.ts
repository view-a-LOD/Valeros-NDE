import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssociatedMediaObject } from '../types/node/associated-media-object';
import { Dimensions } from '../types/dimensions';

export interface IiifImageInfo {
  // '@context'?: string;
  // id?: string;
  // type?: string;
  // protocol?: string;
  // profile?: string;
  width: number;
  height: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class IiifImageService {
  private http = inject(HttpClient);

  getImageDimensions(
    infoUrl: string,
    fallbackWidth = 1280,
    fallbackHeight = 720,
  ): Observable<Dimensions> {
    return this.http.get<IiifImageInfo>(infoUrl).pipe(
      map((info: IiifImageInfo) => ({
        width: info.width || fallbackWidth,
        height: info.height || fallbackHeight,
      })),
      catchError(() =>
        of({
          width: fallbackWidth,
          height: fallbackHeight,
        }),
      ),
    );
  }

  getInfoJsonUrl(media: AssociatedMediaObject): string | null {
    return media.isBasedOn?.id ? `${media.isBasedOn.id}/info.json` : null;
  }
}
