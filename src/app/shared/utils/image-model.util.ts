import { AssociatedMediaObject } from '../types/node/associated-media-object';
import { ImageModel } from '../types/image.model';
import { normalizeToFirst } from './value-normalization.util';

export function getIiifInfoJsonUrl(
  media: AssociatedMediaObject,
): string | undefined {
  return media.isBasedOn?.id ? `${media.isBasedOn.id}/info.json` : undefined;
}

export function toImageModel(media: AssociatedMediaObject): ImageModel {
  return {
    src: media.contentUrl || media.thumbnailUrl || '',
    thumbnail: media.thumbnailUrl || media.contentUrl || '',
    alt: normalizeToFirst<string>(media.name) || media.id || 'Image',
    iiifInfoUrl: getIiifInfoJsonUrl(media),
  };
}
