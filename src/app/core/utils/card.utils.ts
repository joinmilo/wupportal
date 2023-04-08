import { CardInput } from 'src/app/core/typings/card';
import { ArticleEntity, ContestEntity, DealEntity, EventEntity, Maybe, OrganisationEntity, SurveyEntity, UserContextEntity } from "src/schema/schema";

export const eventsToCards = (events?: Maybe<Maybe<EventEntity>[]>): CardInput[] | undefined =>
  events?.map(event => eventToCard(event));

export const eventToCard = (event?: Maybe<EventEntity>): CardInput => ({
  address: event?.address,
  categoryTranslatables: event?.category?.translatables,
  categoryTranslatableField: 'name',
  creator: event?.contact?.name,
  creatorImage: event?.creator?.titleImage,
  date: event?.schedule?.startDate,
  dateTime: true,
  image: event?.cardImage,
  textTranslatableField: 'shortDescription',
  titleTranslatableField: 'name',
  translatables: event?.translatables,
});

export const articlesToCards = (articles?: Maybe<ArticleEntity[]>): CardInput[] | undefined =>
  articles?.map(article => articleToCard(article));

export const articleToCard = (article: Maybe<ArticleEntity>): CardInput => ({
  categoryTranslatables: article?.category?.translatables,
  categoryTranslatableField: 'name',
  date: article?.created,
  dateTime: false,
  creator: article?.publicAuthor?.name ?? article?.author?.user?.firstName,
  creatorImage: article?.author?.titleImage,
  image: article?.cardImage,
  textTranslatableField: 'shortDescription',
  titleTranslatableField: 'title',
  translatables: article?.translatables,
});

export const organisationsToCards = (organisations?: Maybe<OrganisationEntity[]>): CardInput[] | undefined =>
  organisations?.map(organisation => organisationToCard(organisation));

export const organisationToCard = (organisation?: Maybe<OrganisationEntity>): CardInput => ({
  email: organisation?.contact?.email,
  creator: organisation?.name,
  creatorImage: organisation?.avatar,
  dateTime: true,
  translatables: organisation?.translatables,
});

export const authorsToCards = (authors?: Maybe<UserContextEntity[]>): CardInput[] | undefined => 
  authors?.map(author => authorToCard(author));

export const authorToCard = (author?: Maybe<UserContextEntity>): CardInput => ({
  email: author?.user?.email,
  creator: author?.user?.lastName,
  creatorImage: author?.avatar,
  dateTime: true,
});

export const dealsToCards = (deals?: Maybe<DealEntity[]>): CardInput[] => {
  return deals?.map(deal => dealToCard(deal)) as CardInput[];
};

export const dealToCard = (deal: Maybe<DealEntity>): CardInput => ({
  creator: deal?.contact?.name,
  date: deal?.created,
  dateTime: true,
  creatorImage: deal?.creator?.titleImage,
  image: deal?.cardImage,
  textTranslatableField: 'shortDescription',
  translatables: deal?.translatables,
  titleTranslatableField: 'name',
});

export const contestsToCards = (contests?: Maybe<ContestEntity[]>): CardInput[] | undefined => 
  contests?.map(contest => contestToCard(contest));

export const contestToCard = (contest: Maybe<ContestEntity>): CardInput => ({
  image: contest?.cardImage,
  date: contest?.dueDate,
  dateTime: true,
  translatables: contest?.translatables,
  textTranslatableField: 'shortDescription',
  titleTranslatableField: 'name',
});

export const surveysToCards = (surveys?: Maybe<SurveyEntity[]>): CardInput[] | undefined => 
  surveys?.map(survey => surveyToCard(survey));

export const surveyToCard = (survey: Maybe<SurveyEntity>): CardInput => ({
  date: survey?.due_date,
  dateTime: true,
  image: survey?.cardImage,
  translatables: survey?.translatables,
  textTranslatableField: 'description',
  titleTranslatableField: 'name',
});