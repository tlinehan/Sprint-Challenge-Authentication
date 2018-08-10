<!-- Answers to the Short Answer Essay Questions go here -->

>1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
  
    - Middleware: Software or custom made helper functions that perform an action in between the user and database.  
    - Sessions: Use cookies set to the users localstorage from the server, that enable verification.  
    -  bcrypt: Is a middleware package that encrypts passwords, so they are not saved as plain text on the server.  
    - JWT: Is also a middleware package that enebles the server to create a unique and encrypted token, that is sent to the verified user. When requests are made to the server, the user sends a valid token with the request, which the server uses to authenticate before completing the request.

>2.  What does bcrypt do in order to prevent attacks?

    - It protects sensitive data saved on a server, by encrypting it. A secret unique key phrase is needed to decrypt, which is set at time of encryption.

>3.  What are the three parts of the JSON Web Token?

    1. Header:   
        - Type of Token (JWT)  
        - Hashing Algorithm (default HS256)  
    2. Payload:  
        - Claims  
            - Registered Claims   
                - Recommended, not required.    
                - Ex: expiration time 
            - Public Claims  
            - Private Claims
                - Server can add data here, to be set inside token,     
                   like username (Private or Public claim?)
    3. Signature:  
        - To create signature, you need the encoded header and payload, and the secret unique phrase.  
    - If any malicious changes are made to the token, it will be invalid.  
