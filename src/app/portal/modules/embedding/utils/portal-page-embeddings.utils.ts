import { Maybe, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { PageEmbeddingAttributes } from '../typings/page-embedding';

export const mapEmbeddingsToAttributes = (embeddings: Maybe<Maybe<PageEmbeddingEntity>[]>): Maybe<Maybe<PageEmbeddingAttributes>[]> =>
  embeddings 
    ? embeddings?.map(embedding => mapEmbeddingToAttributes(embedding))
    : undefined;

export const mapEmbeddingToAttributes = (embedding: Maybe<PageEmbeddingEntity>): Maybe<PageEmbeddingAttributes> =>
  embedding?.attributes?.reduce((obj, attribute) => {
    switch(attribute?.type?.code) {
      case 'button':
        return {...obj, button: attribute };
      case 'media':
        return {...obj, media: attribute.references?.find(reference => !!reference?.media)?.media };
      case 'multimedia':
        return {...obj, multimedia:
          attribute?.references
            ?.filter(reference => !!reference?.media)
            ?.map(reference => reference?.media)
        };
      case 'plugin':
        return {...obj, plugin: attribute.references?.find(reference => !!reference?.plugin)?.plugin };
      case 'text':
        return {...obj, text: attribute }
      case 'title':
        return {...obj, title: attribute };
      default:
        throw new Error(`Attribute Type with ${attribute?.type?.code} does not exist`);
    }
  }, {}) as PageEmbeddingAttributes;