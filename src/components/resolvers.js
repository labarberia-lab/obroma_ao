// resolvers.js

const resolvers = {
    Query: {
      getUser: async (_, { id }, { dataSources }) => {
        return await dataSources.userService.getUser(id);
      }
    },
    Mutation: {
      followUser: async (_, { userId }, { dataSources }) => {
        return await dataSources.userService.followUser(userId);
      },
      unfollowUser: async (_, { userId }, { dataSources }) => {
        return await dataSources.userService.unfollowUser(userId);
      },
      sendFriendRequest: async (_, { userId }, { dataSources }) => {
        return await dataSources.userService.sendFriendRequest(userId);
      },
      acceptFriendRequest: async (_, { userId }, { dataSources }) => {
        return await dataSources.userService.acceptFriendRequest(userId);
      }
    }
  };
  
  module.exports = resolvers;

  