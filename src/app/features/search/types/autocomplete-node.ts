import { ImageModel } from '../../../core/models/image/image.model';

export interface AutocompleteNode {
  id: string;
  name?: string;
  image?: ImageModel;
}
