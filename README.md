To run jenkins : java -jar jenkins.war --enable-future-java
If node_modules folder is missing run the command : npm install

//Installation
npm init playwright@latest
npm install @cucumber/cucumber
npm install --save-dev ts-node typescript
npm install xlsx
npm install csv-parse
npm install faker@5
npm install dotenv

Run commands
Command to run with tags: $env:BROWSER="chrome";$env:ENV="tap"; npx playwright test --grep "@tabHandleUsingTitle"
Command to run with filename: $env:ENV="local";npx playwright test tests/Login.spec.ts
$env:BROWSER="chrome";$env:ENV="rsa"; npx playwright test --tags "@smoke"
$env:ENV="local";npm run test:run