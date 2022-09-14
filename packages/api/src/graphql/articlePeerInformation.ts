import {GraphQLPeer} from './peer'
import {createProxyingResolver} from '../utility'
import {GraphQLPublicArticle} from './article'
import {GraphQLObjectType, GraphQLNonNull, GraphQLID} from 'graphql'
import {GraphQLDateTime} from 'graphql-iso-date'
import {ArticlePeerInformation} from '../db/article'
import {Context} from '../context'

export const GraphQLArticlePeerInformation = new GraphQLObjectType<ArticlePeerInformation, Context>(
  {
    name: 'ArticlePeerInformation',
    fields: {
      id: {type: GraphQLNonNull(GraphQLID)},
      createdAt: {type: GraphQLNonNull(GraphQLDateTime)},
      modifiedAt: {type: GraphQLDateTime},
      peer: {
        type: GraphQLNonNull(GraphQLPeer),
        resolve: createProxyingResolver(({peerId}, {loaders}) => loaders.peer.load(peerId))
      },
      producerArticle: {
        type: GraphQLNonNull(GraphQLPublicArticle),
        resolve: createProxyingResolver(({producerArticleId}, {loaders}) => {
          loaders.peerArticle.load(producerArticleId)
        })
      },
      consumerArticle: {
        type: GraphQLNonNull(GraphQLPublicArticle),
        resolve: createProxyingResolver(({consumerArticleId}, {loaders}) =>
          loaders.article.load(consumerArticleId)
        )
      }
    }
  }
)
