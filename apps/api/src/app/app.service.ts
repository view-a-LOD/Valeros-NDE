import { Injectable } from '@nestjs/common';
import { createLens, Lens, SchemaInterface, type Options } from 'ldkit';
import { rdfs } from 'ldkit/namespaces';
import { QueryEngine as Comunica } from '@comunica/query-sparql';

const NodeSchema = {
  label: rdfs.label,
} as const;

type NodeType = SchemaInterface<typeof NodeSchema>;

@Injectable()
export class AppService {
  async getData(): Promise<NodeType[]> {
    const searchHits: NodeType[] = await this.search(
      [
        'https://api.triplydb.com/datasets/academy/pokemon/sparql',
        'https://api.triplydb.com/datasets/Triply/iris/sparql',
      ],
      'Growl',
    );
    return searchHits;
  }

  async search(endpoints: string[], searchTerm?: string): Promise<NodeType[]> {
    if (!endpoints || endpoints.length === 0) {
      return [];
    }

    const engine = new Comunica();
    const options: Options = {
      sources: endpoints as [string, ...string[]],
      engine,
    };

    const lens: Lens<NodeType> = createLens(NodeSchema, options);

    if (searchTerm) {
      // TODO: Support full-text search here (e.g. through QLever ql: syntax)
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
