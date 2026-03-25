import { Injectable } from '@nestjs/common';
import { createLens, Lens, SchemaSearchInterface, type Options } from 'ldkit';
import { QueryEngine as Comunica } from '@comunica/query-sparql';
import { NodeSchema, NodeType } from '@valeros-ldkit/shared-types';

@Injectable()
export class AppService {
  async search(
    endpoints: string[],
    filters?: SchemaSearchInterface<NodeType>,
  ): Promise<NodeType[]> {
    if (!endpoints || endpoints.length === 0) {
      return [];
    }

    const engine = new Comunica();
    const options: Options = {
      sources: endpoints as [string, ...string[]],
      engine,
    };

    const lens: Lens<NodeType> = createLens(NodeSchema, options);

    // TODO: Support full-text search here (e.g. through QLever ql: syntax)

    if (filters) {
      const results: NodeType[] = await lens.find({
        where: filters,
      });

      return results;
    }

    const results: NodeType[] = await lens.find({ take: 10 });
    return results;
  }
}
