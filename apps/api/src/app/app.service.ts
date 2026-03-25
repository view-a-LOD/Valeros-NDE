import { Injectable } from '@nestjs/common';
import { createLens, Lens, SchemaInterface, type Options } from 'ldkit';
import { rdfs } from 'ldkit/namespaces';

const NodeSchema = {
  label: rdfs.label,
} as const;

type NodeType = SchemaInterface<typeof NodeSchema>;

@Injectable()
export class AppService {
  async getData(): Promise<NodeType[]> {
    const searchHits: NodeType[] = await this.search(
      'https://api.triplydb.com/datasets/academy/pokemon/sparql',
      'Growl',
    );
    return searchHits;
  }

  async search(endpoint: string, searchTerm?: string): Promise<NodeType[]> {
    const options: Options = {
      sources: [endpoint],
    };

    const lens: Lens<NodeType> = createLens(NodeSchema, options);

    if (searchTerm) {
      const results: NodeType[] = await lens.find({
        where: {
          label: { $contains: searchTerm },
        },
      });

      return results;
    }

    const results: NodeType[] = await lens.find({ take: 10 });
    return results;
  }
}
