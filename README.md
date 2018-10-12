## Soccor

> GET: `/api/v1/countries` (Get all Countries)

    - Parameters: none
    - Response: array of country objects

> GET: `/api/v1/players` (Get all players)

    - Parameters: none
    - Response: 
        code 200: Array of player objects
        code 4xx, 5xx: error message

> GET: `/api/v1/players/:id` (Get player by id)

    - Request Parameters: player_id
    - Response: 
        code 200: Array of the player object
        code 4xx, 5xx: error message
    
> GET:  `/api/v1/country/:id/players (Get all players by country id)

    - Request Parameters: country_id
    - Response: 
        code 200: Array of Player objects associated with the country_id
        code 4xx, 5xx: error message

> GET:  `/api/v1/users` (Get all users)

    - Parameters: None
    - Response: 
        code 200: Array of user objects
        code 4xx, 5xx: error message
    
> GET:  `/api/v1/users/:id` (Get user info by id)

    - Request Parameters: 
        user id: [user_id]
    - Response: 
        code 200: array of the user object
        code 4xx, 5xx: error message

>POST: `/api/v1/users` (Add a new user)

    - Parameters:
        username: [username of user]
        password: [password of user]
    - Response: 
        code 201: username created message
        code 422: error message
        
>POST: `/api/v1/countries` (Add a new country)

    - Parameters: 
        country: [country name]
        flag: [image url of country flag]
    - Response: 
        code 201: country created message
        code 422: error message 
        
>PUT: `/api/v1/users/:id/:player/players/:player_id` (replace a player to users team)

    - Request Parameters: 
        user id: [user_id]
        team player number: [column number of player]
        player id: [player_id]
    - Response:
        code 201: player created message 
        code 422: error message 

>PUT: `/api/v1/users/:id/` (edit a users info)
    
    - Request Parameters: 
        user id: [user_id]
    - Body Parameters: 
        username: [new username]
        password: [new password]   
    - Response:
        code 201: updated user info message
        code 422: error message 

>DELETE: `/api/v1/users/:id` (delete a user)
    
    - Request Parameters:
        user id: [user_id]
    - 

    
