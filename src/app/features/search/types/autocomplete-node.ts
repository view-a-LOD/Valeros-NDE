import { ImageModel } from '../../../shared/image/types/image.model';

export interface AutocompleteNode {
  id: string;
  name?: string;
  image?: ImageModel;
}
