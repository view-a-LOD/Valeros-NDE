import { Component, OnDestroy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { AssociatedMediaObject } from '../../../types/node/associated-media-object';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IiifImageService } from '../../../services/iiif-image.service';
import { normalizeToString } from '../../../utils/value-normalization.util';
import { ImageData } from './image-gallery-widget.types';
import { Dimensions } from '../../../types/dimensions';

@Component({
  selector: 'app-image-gallery-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery-widget.component.html',
})
export class ImageGalleryWidget extends BaseWidget implements OnDestroy {
  private iiifService = inject(IiifImageService);
  private lightbox?: PhotoSwipeLightbox;
  readonly galleryId = `gallery-${crypto.randomUUID()}`;
  readonly imagesWithDimensions = signal<ImageData[]>([]);

  constructor() {
    super();
    effect(() => {
      const images = this.getImagesData();
      if (images.length > 0) {
        this.loadImageDimensions(images);
      }
    });
  }

  private getImagesData(): ImageData[] {
    return (this.values() as AssociatedMediaObject[])
      .map(
        (media: AssociatedMediaObject): ImageData => ({
          src: media.contentUrl || media.thumbnailUrl || '',
          thumbnail: media.thumbnailUrl || media.contentUrl || '',
          alt: normalizeToString(media.name) || media.id || 'Image',
          iiifInfoUrl: this.iiifService.getInfoJsonUrl(media),
        }),
      )
      .filter((img) => img.src !== '');
  }

  private loadImageDimensions(images: ImageData[]): void {
    const dimensionRequests: Observable<ImageData>[] = images.map((img) => {
      if (!img.iiifInfoUrl) {
        // TODO: Add alternative way of retrieving image dimensions if IIIF is not available
        console.warn('IIIF info URL not available for image:', img.src);
        return of(img);
      }

      return this.iiifService.getImageDimensions(img.iiifInfoUrl).pipe(
        map((dimensions: Dimensions) => ({
          ...img,
          width: dimensions.width,
          height: dimensions.height,
        })),
      );
    });

    forkJoin(dimensionRequests).subscribe(
      (imagesWithDimensions: ImageData[]) => {
        this.imagesWithDimensions.set(imagesWithDimensions);
        setTimeout(() => {
          this.initializeLightbox();
        });
      },
    );
  }

  private initializeLightbox(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: `#${this.galleryId}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    this.lightbox.init();
  }

  ngOnDestroy(): void {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }
}
