local json = require('json')
-- Define OBROMA and CRED process IDs
local OBROMA_PROCESS_ID = "u2dm_Gk38Q1QU78FuSSY8xqeoirCkMLzkIQukG-fgVw"
local CRED_PROCESS_ID = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

-- Define balances for OBROMA and CRED tokens
local Balances = { [OBROMA_PROCESS_ID] = 0, [CRED_PROCESS_ID] = 0 }

-- Handler for sending messages
Handlers.add('send_message', function(msg)
    -- Extract necessary information from the message
    local recipient = msg.Tags.Recipient
    local messageContent = msg.Tags.Message

    -- Send the message to the recipient
    return {
        Messages = {
            {
                Target = recipient,
                Tags = { Message = messageContent }
            }
        }
    }
end)

-- Handler for uploading and updating profile images
Handlers.add('update_profile_image', function(msg)
    -- Extract necessary information from the message
    local userId = msg.Tags.UserId
    local imageURL = msg.Tags.ImageURL

    -- Update the user's profile image URL in the database or storage

    -- Respond to the user
    return {
        Messages = {
            {
                Target = userId,
                Tags = { Action = 'ProfileImageUpdated', ImageURL = imageURL }
            }
        }
    }
end)

-- Handler for posting images and pictures
Handlers.add('create_post', function(msg)
    -- Extract necessary information from the message
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
end)

-- Handler for tipping other users for their content
Handlers.add('tip_user', function(msg)
    -- Extract necessary information from the message
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
end)
