import { gql } from "@apollo/client";
import { apolloClient } from "..";

export const ReactionType = {
  UPVOTE: "UPVOTE",
};

const Query = {
  comment: gql(`
          mutation($request: CreatePublicCommentRequest! ){
            createCommentTypedData(request: $request){
              id
              expiresAt
              typedData{
                types{
                  CommentWithSig{
                    name
                    type
                  }
                }
                domain{
                  name
                  chainId
                  version
                  verifyingContract
                }
                value{
                  nonce
                  deadline
                  profileId
                  contentURI
                  profileIdPointed
                  pubIdPointed
                  collectModule
                  collectModuleInitData
                  referenceModule
                  referenceModuleData
                  referenceModuleInitData
                }
              }
            }
          }
  `),
  postViaDispatcher: gql(`mutation($request:CreatePublicPostRequest!){
    createPostViaDispatcher(request: $request){
      ... on RelayerResult{
        txId
        txHash
      }
      ... on RelayError{
        reason
      }
    }
  }`),

  publications:
    gql(`query($request: PublicationsQueryRequest!, $profileId:ProfileId){
    publications(request: $request){
      items{
        ... on Post {
          id
          appId
          reaction(request: {profileId: $profileId})
          profile{
            handle
          }
          metadata{
            content
            image
            attributes{
              traitType
              displayType
              value
            }
          }
        }
        ... on Comment {
          id
          appId
          reaction(request: {profileId: $profileId})
          profile{
            handle
          }
          metadata{
            content
            image
            attributes{
              traitType
              displayType
              value
            }
          }
        }
      }
      pageInfo{
        next
        prev
        totalCount
      }
    }
  }`),
  addReaction: gql(
    `mutation AddReaction($request: ReactionRequest!) {\n  addReaction(request: $request)\n}`
  ),
  publication: gql(`query($request:PublicationQueryRequest!){
  	publication(request: $request){
    	... on Post{
        id
        hasCollectedByMe
        stats{
          totalAmountOfCollects
        }
        metadata{
          description
        }
      }
  }
}`),

  index: gql(`query($request: HasTxHashBeenIndexedRequest!){
    hasTxHashBeenIndexed(request:$request){
      ... on TransactionIndexedResult{
        indexed
        txHash
        metadataStatus{
          status
          reason
        }
        __typename
      }
      __typename
    }
    __typename
  }`),
};

class PublicationApi {
  createCommentTypedData(request) {
    return apolloClient.mutate({
      mutation: Query.comment,
      variables: {
        request: request,
      },
    });
  }

  createPostViaDispatcher(request) {
    return apolloClient.mutate({
      mutation: Query.postViaDispatcher,
      variables: {
        request,
      },
    });
  }

  fetchCommentsFromPostId({ postId, cursor, profileId }) {
    const request = {};
    if (postId) {
      request.commentsOf = postId;
    }
    if (cursor) {
      request.cursor = cursor;
    }
    // console.log("Fetching comment, ", { request, profileId });
    return apolloClient.query({
      query: Query.publications,
      variables: {
        request: request,
        profileId,
      },
    });
  }

  addReaction({ profileId, reactionType, publicationId }) {
    return apolloClient.mutate({
      mutation: Query.addReaction,
      variables: {
        request: { profileId, reaction: reactionType, publicationId },
      },
    });
  }

  fetchPublication({ publicationId }) {
    return apolloClient.query({
      query: Query.publication,
      variables: {
        request: {
          publicationId,
        },
      },
      fetchPolicy: "no-cache",
    });
  }

  fetchPublicationWithTranscationHash(txHash) {
    return apolloClient.query({
      query: Query.publication,
      variables: {
        request: {
          txHash,
        },
      },
    });
  }

  hasTxBeenIndexed({ txId, txHash }) {
    let request = {};
    if (txId) {
      request.txId = txId;
    }
    if (txHash) {
      request.txHash = txHash;
    }
    return apolloClient.query({
      query: Query.index,
      variables: {
        request,
      },
      fetchPolicy: "no-cache",
    });
  }

  postWithDispatcher() {}
}

export default new PublicationApi();
