 
# Mystfeed
Unmask the mystery without revealing yours!All routes working fine
# API Documentation

## User Routes

| Route                          | Method | Description                                   | Parameters                                                  |
|--------------------------------|--------|-----------------------------------------------|-------------------------------------------------------------|
| `/api/user/sign-up`            | POST   | Registers a new user                          | `username` (string): The desired username<br> `password` (string): The password for the new account<br> `email` (string): The email address of the new user|
| `/api/user/verify-code`        | POST   | Verifies the user's code                      | `username` (string): The username of the user<br> `verificationCode` (string): The code sent for verification|
| `/api/user/resend-verifycode`  | POST   | Resends the verification code to the user     | `username` (string): The username of the user                |
| `/api/user/validate-username`  | POST   | Checks if the username is available           | `username` (string): The username to check                   |

### Example: `/api/user/sign-up`

#### Description
Registers a new user in the system.

#### Method
`POST`

#### Request Parameters
- `username` (string): The desired username of the new user.
- `password` (string): The password for the new account.
- `email` (string): The email address of the new user.

#### Request Example
```json
{
  "username": "newuser",
  "password": "password123",
  "email": "newuser@example.com"
}
```

#### Response Example
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

## Message Routes

| Route                          | Method | Description                                   | Parameters                                                  |
|--------------------------------|--------|-----------------------------------------------|-------------------------------------------------------------|
| `/api/message/send`            | POST   | Sends a message to a user                     | `username` (string): The recipient's username<br> `content` (string): The content of the message|
| `/api/message/get-all`         | GET    | Retrieves all messages for a user             | `username` (string): The username of the user               |
| `/api/message/reply`           | POST   | Replies to a specific message                 | `messageId` (string): The ID of the message to reply to<br> `content` (string): The reply content|
| `/api/message/delete`          | DELETE | Deletes a specific message                    | `messageId` (string): The ID of the message to delete       |

### Example: `/api/message/send`

#### Description
Sends a message to a user.

#### Method
`POST`

#### Request Parameters
- `username` (string): The recipient's username.
- `content` (string): The content of the message.

#### Request Example
```json
{
  "username": "recipient",
  "content": "Hello, how are you?"
}
```

#### Response Example
```json
{
  "success": true,
  "message": "Message sent successfully",
  "mysticMessage": {
    "id": "12345",
    "content": "Hello, how are you?",
    "username": "recipient",
    "userId": "67890"
  }
}
``` 

### TODO

- /api/user-change-username
- /api/user-change-email
 
