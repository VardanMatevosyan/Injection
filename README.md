## OAuth2.0 Course - Authorization Code Injection attack example

Set-up authorization code injection projects

1. Load the [extentation_chrome](..%2Fextentation_chrome) for your first google account

2. Load the [extention_chrome_attacker](..%2Fextention_chrome_attacker) for your second google account

3. Change the environment variables inside the Dockerfile in the  user-service
   ```properties
   oauth0-host=YOUR OAUTH HOST HERE
   ```

4. Change the constant variables inside the ./js/app.js file in the [oauth2.0_client_app](..%2Foauth2.0_client_app) folder
   ```javascript
   const clientId = 'YOUR CLIENT ID';
   const authorizeUrl = 'YOUR authorize/ ENDPOINT';
   const tokenUrl = 'YOUR oauth/token ENDPOINT';
   ```

5. Build oauth2_client by running below command in the root folder [oauth2.0_client_app](..%2Foauth2.0_client_app)
   ```shell
   docker build -t oauth2_client:latest -f Dockerfile .
   ```

6. Build user-service by running below command in the root folder [user-service](..%2Fuser-service)
   ```shell
   docker build -t user-service:latest -f Dockerfile .
   ```

7. Build hackcode-service by running below command in the root folder [hackcode](..%2Fhackcode)
   ```shell
   docker build -t hackcode-service:latest -f Dockerfile .
   ```
8. Run the command in the project root folder ./Injection
   ```shell
   docker-compose up
   ```


## Oauth 2.0 Authorization Code flow example

1. Change the environment variables inside the Dockerfile in the  user-service
   ```properties
   oauth0-host=YOUR OAUTH HOST HERE
   ```

2. Change the constant variables inside the ./js/app.js file in the [oauth2.0_client_app](..%2Foauth2.0_client_app) folder
   ```javascript
   const clientId = 'YOUR CLIENT ID';
   const authorizeUrl = 'YOUR authorize/ ENDPOINT';
   const tokenUrl = 'YOUR oauth/token ENDPOINT';
   ```

3. Build oauth2_client by running below command in the root folder [oauth2.0_client_app](..%2Foauth2.0_client_app)
   ```shell
   docker build -t oauth2_client:latest -f Dockerfile .
   ```

4. Build user-service by running below command in the root folder [user-service](..%2Fuser-service)
   ```shell
   docker build -t user-service:latest -f Dockerfile .
   ```
   
5. Run the command in the project root folder ./Injection
   ```shell
   docker-compose -f ./docker-compose-auth-code-demo.yml up
   ```
