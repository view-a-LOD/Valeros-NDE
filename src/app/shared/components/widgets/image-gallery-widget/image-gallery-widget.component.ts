import { Component, OnDestroy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { AssociatedMediaObject } from '../../../types/node/associated-media-object';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IiifImageService } from '../../../services/iiif-image.service';
import { ImageModel } from '../../../types/image.model';
import { Dimensions } from '../../../types/dimensions';
import { toImageModel } from '../../../utils/image-model.util';

@Component({
  selector: 'app-image-gallery-widget',

  imports: [CommonModule],
  templateUrl: './image-gallery-widget.component.html',
})
export class ImageGalleryWidget extends BaseWidget implements OnDestroy {
  private iiifService = inject(IiifImageService);
  private lightbox?: PhotoSwipeLightbox;
  readonly galleryId = `gallery-${crypto.randomUUID()}`;
  readonly imagesWithDimensions = signal<ImageModel[]>([]);

  constructor() {
    super();
    effect(() => {
      const images = this.getImagesData();
      if (images.length > 0) {
        this.loadImageDimensions(images);
      }
    });
  }

  private getImagesData(): ImageModel[] {
    return (this.values() as AssociatedMediaObject[])
      .map((media: AssociatedMediaObject) => toImageModel(media))
      .filter((img) => img.src !== '');
  }

  private loadImageDimensions(images: ImageModel[]): void {
    const dimensionRequests: Observable<ImageModel>[] = images.map((img) => {
      if (!img.iiifInfoUrl) {
        // TODO: Add alternative way of retrieving image dimensions if IIIF is not available
        console.warn('IIIF info URL not available for image:', img.src);
        return of(img);
      }

      return this.iiifService.getImageDimensions(img.iiifInfoUrl).pipe(
        map((dimensions: Dimensions | null) => ({
          ...img,
          dimensions: dimensions || undefined,
        })),
      );
    });

    forkJoin(dimensionRequests).subscribe(
      (imagesWithDimensions: ImageModel[]) => {
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
      errorMsg: 'Er ging iets mis bij het laden van de afbeelding',
    });
    // this.lightbox.addFilter(
    //   'contentErrorElement',
    //   (contentErrorElement, content) => {
    //     const el = document.createElement('div');
    //     el.className = 'pswp__error-msg';
    //     el.innerHTML = `<img src="https://placehold.co/600x400.png" alt="Image unavailable" />`;
    //     return el;
    //   },
    // );
    // this.lightbox.addFilter('placeholderSrc', (placeholderSrc, content) => {
    //   return 'https://placehold.co/600x400.png';
    // });

    this.lightbox.init();
  }

  onThumbnailError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400?text=X';
  }

  ngOnDestroy(): void {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }
}
