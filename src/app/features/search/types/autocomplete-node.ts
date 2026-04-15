import { ImageModel } from '../../../shared/types/image.model';

export interface AutocompleteNode {
  id: string;
  name?: string;
  image?: ImageModel;
}
