// resolvers.js

const resolvers = {
    Query: {
      getPost: async (_, { id }, { dataSources }) => {
        return await dataSources.postService.getPost(id);
      }
    },
    Mutation: {
      sendMessage: async (_, { senderId, receiverId, content }, { dataSources }) => {
        return await dataSources.messageService.sendMessage(senderId, receiverId, content);
      },
      addComment: async (_, { userId, postId, content }, { dataSources }) => {
        return await dataSources.commentService.addComment(userId, postId, content);
      },
      createPost: async (_, { userId, content }, { dataSources }) => {
        return await dataSources.postService.createPost(userId, content);
      }
    }
  };
  
  module.exports = resolvers;
  