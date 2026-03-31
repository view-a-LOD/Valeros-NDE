import { SearchResponseDto } from './search-response.dto';

export const SEARCH_MOCK_DATA: SearchResponseDto = {
  results: [
    // TODO: Should we add @context here to make this (more) valid JSON-LD?
    {
      '@id': 'http://www.wikidata.org/entity/Q5582',
      '@type': ['http://schema.org/Person'],
      label: [
        {
          '@value': 'Vincent van Gogh',
          '@language': 'en',
          highlight: '<mark>Vincent</mark> van Gogh',
          snippet: '<mark>Vincent</mark> van Gogh',
        },
        {
          '@value': 'Vincent van Gogh',
          '@language': 'nl',
          highlight: '<mark>Vincent</mark> van Gogh',
          snippet: '<mark>Vincent</mark> van Gogh',
        },
      ],
      description: [
        {
          '@value':
            'Dutch post-impressionist painter Vincent van Gogh is among the most famous and influential figures in the history of Western art.',
          '@language': 'en',
          highlight:
            'Dutch post-impressionist painter <mark>Vincent</mark> van Gogh is among the most famous and influential figures in the history of Western art.',
          snippet:
            '...post-impressionist painter <mark>Vincent</mark> van Gogh is among the most famous...',
        },
        {
          '@value':
            'Nederlandse postimpressionistische schilder Vincent van Gogh behoort tot de beroemdste en invloedrijkste figuren in de geschiedenis van de westerse kunst.',
          '@language': 'nl',
          highlight:
            'Nederlandse postimpressionistische schilder <mark>Vincent</mark> van Gogh behoort tot de beroemdste en invloedrijkste figuren in de geschiedenis van de westerse kunst.',
          snippet:
            '...postimpressionistische schilder <mark>Vincent</mark> van Gogh behoort tot de beroemdste...',
        },
      ],
      birthPlace: {
        '@id': 'http://www.wikidata.org/entity/Q9883',
        label: [
          {
            '@value': 'Zundert',
            '@language': 'en',
          },
          {
            '@value': 'Zundert',
            '@language': 'nl',
          },
        ],
        description: [
          {
            '@value': 'Municipality in North Brabant, Netherlands',
            '@language': 'en',
          },
          {
            '@value': 'Gemeente in Noord-Brabant, Nederland',
            '@language': 'nl',
          },
        ],
      },
    },
  ],
  totalResults: 156,
  limit: 10,
  offset: 0,
  facets: {
    type: [
      {
        '@id': 'http://schema.org/Person',
        label: [
          { '@value': 'Person', '@language': 'en' },
          { '@value': 'Persoon', '@language': 'nl' },
        ],
        count: 42,
      },
      {
        '@id': 'http://schema.org/CreativeWork',
        label: [
          { '@value': 'Creative Work', '@language': 'en' },
          { '@value': 'Creatief werk', '@language': 'nl' },
        ],
        count: 38,
        // TODO: Not sure if we need to support hierarchical/nested facets
        facets: {
          medium: [
            {
              '@id': 'http://vocab.getty.edu/aat/300033618',
              label: [
                { '@value': 'Oil painting', '@language': 'en' },
                { '@value': 'Olieverfschilderij', '@language': 'nl' },
              ],
              count: 15,
            },
            {
              '@id': 'http://vocab.getty.edu/aat/300033973',
              label: [
                { '@value': 'Drawing', '@language': 'en' },
                { '@value': 'Tekening', '@language': 'nl' },
              ],
              count: 12,
            },
            {
              '@id': 'http://vocab.getty.edu/aat/300041273',
              label: [
                { '@value': 'Prints', '@language': 'en' },
                { '@value': 'Prenten', '@language': 'nl' },
              ],
              count: 11,
            },
          ],
        },
      },
    ],
    creator: [
      {
        '@id': 'http://www.wikidata.org/entity/Q5598',
        label: [
          { '@value': 'Rembrandt van Rijn', '@language': 'en' },
          { '@value': 'Rembrandt van Rijn', '@language': 'nl' },
        ],
        count: 15,
      },
      {
        '@id': 'http://www.wikidata.org/entity/Q41264',
        label: [
          { '@value': 'Johannes Vermeer', '@language': 'en' },
          { '@value': 'Johannes Vermeer', '@language': 'nl' },
        ],
        count: 8,
      },
    ],
    'creator.nationality': [
      {
        '@id': 'http://www.wikidata.org/entity/Q55',
        label: [
          { '@value': 'Dutch', '@language': 'en' },
          { '@value': 'Nederlands', '@language': 'nl' },
        ],
        count: 23,
      },
      {
        '@id': 'http://www.wikidata.org/entity/Q142',
        label: [
          { '@value': 'French', '@language': 'en' },
          { '@value': 'Frans', '@language': 'nl' },
        ],
        count: 12,
      },
      {
        '@id': 'http://www.wikidata.org/entity/Q38',
        label: [
          { '@value': 'Italian', '@language': 'en' },
          { '@value': 'Italiaans', '@language': 'nl' },
        ],
        count: 7,
      },
    ],
  },
};
