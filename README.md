Set-up authorization code injection projects

1. Load the [extentation_chrome](..%2Fextentation_chrome) for your first google account

2. Load the [extention_chrome_attacker](..%2Fextention_chrome_attacker) for your second google account

3. Change the environment variables inside the Dockerfile in the  user-service
oauth0-host=YOUR OAUTH HOST HERE

4. Change the constant variables inside the ./js/app.js file in the [oauth2.0_client_app](..%2Foauth2.0_client_app) folder
   const clientId = 'YOUR CLIENT ID';
   const authorizeUrl = 'YOUR authorize/ ENDPOINT';
   const tokenUrl = 'YOUR oauth/token ENDPOINT';

5. Build oauth2_client
run below command in the root folder [oauth2.0_client_app](..%2Foauth2.0_client_app)
docker build -t oauth2_client:latest -f Dockerfile .

6. Build user-service
run below command in the root folder [user-service](..%2Fuser-service)
docker build -t user-service:latest -f Dockerfile .

7. Build hackcode-service
run below command in the root folder [hackcode](..%2Fhackcode)
docker build -t hackcode-service:latest -f Dockerfile .
