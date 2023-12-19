import { Maybe, MediaEntity, PageAttributeEntity, PluginEntity } from 'src/app/core/api/generated/schema';

export type PageEmbeddingAttributes = {
  button?: Maybe<PageAttributeEntity>, 
  media?: Maybe<MediaEntity>,
  multimedia?: Maybe<MediaEntity[]>,
  plugin?: Maybe<PluginEntity>,
  title?: Maybe<PageAttributeEntity>,
  text?: Maybe<PageAttributeEntity>,
};