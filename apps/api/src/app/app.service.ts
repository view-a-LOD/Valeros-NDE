import { Injectable } from '@nestjs/common';
import { createLens, Lens, SchemaInterface, type Options } from 'ldkit';
import { rdfs } from 'ldkit/namespaces';
import { QueryEngine } from '@comunica/query-sparql';

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
    const queryEngine = new QueryEngine();
    const options: Options = {
      sources: [endpoint],
      queryEngine,
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
