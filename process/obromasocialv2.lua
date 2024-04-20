local json = require('json')

-- Define OBROMA and CRED process IDs
local OBROMA_PROCESS_ID = "u2dm_Gk38Q1QU78FuSSY8xqeoirCkMLzkIQukG-fgVw"
local CRED_PROCESS_ID = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

-- Define balances for OBROMA and CRED tokens
local Balances = { [OBROMA_PROCESS_ID] = 0, [CRED_PROCESS_ID] = 0 }

-- Define Handlers table
Handlers = Handlers or {}

-- Define utility functions for handler pattern matching
local function hasMatchingTag(tag, value)
    return function(msg)
        return msg.Tags[tag] == value
    end
end

-- Initialize Posts and Replies tables
Posts = Posts or {}
Replies = Replies or {}

-- Add handlers for different actions
Handlers.add(
    "GetPosts",
    hasMatchingTag("Action", "GetPosts"),
    function(msg)
        Handlers.utils.reply(json.encode(Posts))(msg)
    end
)

Handlers.add(
    "SendPost",
    hasMatchingTag("Action", "SendPost"),
    function(msg)
        table.insert(Posts, msg.Data)
    end
)

Handlers.add(
    "GetReplies",
    hasMatchingTag("Action", "GetReplies"),
    function(msg)
        Handlers.utils.reply(json.encode(Replies))(msg)
    end
)

Handlers.add(
    "SendReply",
    hasMatchingTag("Action", "SendReply"),
    function(msg)
        table.insert(Replies, msg.Data)
    end
)

-- Handler for sending messages
Handlers.add(
    "send_message",
    hasMatchingTag("Action", "send_message"),
    function(msg)
        local recipient = msg.Tags.Recipient
        local messageContent = msg.Tags.Message

        return {
            Messages = {
                {
                    Target = recipient,
                    Tags = { Message = messageContent }
                }
            }
        }
    end
)

-- Handler for uploading and updating profile images
Handlers.add(
    "update_profile_image",
    hasMatchingTag("Action", "update_profile_image"),
    function(msg)
        local userId = msg.Tags.UserId
        local imageURL = msg.Tags.ImageURL

        return {
            Messages = {
                {
                    Target = userId,
                    Tags = { Action = 'ProfileImageUpdated', ImageURL = imageURL }
                }
            }
        }
    end
)

-- Handler for creating posts
Handlers.add(
    "create_post",
    hasMatchingTag("Action", "create_post"),
    function(msg)
        local userId = msg.Tags.UserId
        local postContent = msg.Tags.Content
        local imageURLs = msg.Tags.ImageURLs

        -- Create the post with content and image URLs

        -- Respond to the user
        return {
            Messages = {
                {
                    Target = userId,
                    Tags = { Action = 'PostCreated', PostContent = postContent }
                }
            }
        }
    end
)

-- Handler for tipping other users for their content
Handlers.add(
    "tip_user",
    hasMatchingTag("Action", "tip_user"),
    function(msg)
        local senderId = msg.From
        local recipientId = msg.Tags.Recipient
        local amount = tonumber(msg.Tags.Amount)
        local token = msg.Tags.Token

        -- Validate the token (OBROMA or CRED)
        if token ~= OBROMA_PROCESS_ID and token ~= CRED_PROCESS_ID then
            return {
                Messages = {
                    {
                        Target = senderId,
                        Tags = { Action = 'InvalidToken', Message = 'Invalid token specified' }
                    }
                }
            }
        end

        -- Validate the sender's balance
        if Balances[senderId] < amount then
            return {
                Messages = {
                    {
                        Target = senderId,
                        Tags = { Action = 'InsufficientBalance', Message = 'Insufficient balance' }
                    }
                }
            }
        end

        -- Deduct the amount from the sender's balance
        Balances[senderId] = Balances[senderId] - amount

        -- Add the amount to the recipient's balance
        Balances[recipientId] = (Balances[recipientId] or 0) + amount

        -- Respond to the sender and notify the recipient
        return {
            Messages = {
                {
                    Target = senderId,
                    Tags = { Action = 'TipSent', Recipient = recipientId, Amount = amount, Token = token }
                },
                {
                    Target = recipientId,
                    Tags = { Action = 'TipReceived', Sender = senderId, Amount = amount, Token = token }
                }
            }
        }
    end
)

-- Define Users table to store user data
Users = Users or {}

-- Handler for user registration
Handlers.add(
    "register_user",
    hasMatchingTag("Action", "register_user"),
    function(msg)
        local userId = msg.From
        local userData = msg.Tags.UserData

        -- Parse the user data JSON string into a Lua table
        local userDataTable = json.decode(userData)

        -- Store user data
        Users[userId] = userDataTable

        -- Respond to the user
        return {
            Messages = {
                {
                    Target = userId,
                    Tags = { Action = 'UserRegistered', UserData = userData }
                }
            }
        }
    end
)

-- Handler for updating user profile
Handlers.add(
    "update_profile",
    hasMatchingTag("Action", "update_profile"),
    function(msg)
        local userId = msg.From
        local updatedData = msg.Tags.UpdatedData

        -- Update user data
        if Users[userId] then
            local userData = json.decode(updatedData)
            for key, value in pairs(userData) do
                Users[userId][key] = value
            end
        end

        -- Respond to the user
        return {
            Messages = {
                {
                    Target = userId,
                    Tags = { Action = 'ProfileUpdated', UpdatedData = updatedData }
                }
            }
        }
    end
)

-- Handler for connecting user wallet and setting profile ID
Handlers.add(
    "connect_wallet",
    hasMatchingTag("Action", "connect_wallet"),
    function(msg)
        local userId = msg.From
        local walletAddress = msg.Tags.WalletAddress

        -- Set wallet address as profile ID
        if Users[userId] then
            Users[userId]["profileID"] = walletAddress
        end

        -- Access AO process for the user
        -- Perform actions like registering the user, fetching data, etc.

        -- Respond to the user
        return {
            Messages = {
                {
                    Target = userId,
                    Tags = { Action = 'WalletConnected', WalletAddress = walletAddress }
                }
            }
        }
    end
)

-- Add other handlers for existing functionalities as before
