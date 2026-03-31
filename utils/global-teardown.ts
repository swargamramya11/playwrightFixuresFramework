import { execSync } from 'child_process';

async function globalTeardown() {
  console.log("Generating Allure Report...");

  execSync(
    'npx allure generate reports/allure-results -o reports/allure-report --clean --single-file',
    { stdio: 'inherit' }
  );

  console.log("Allure Report Generated!");
}

export default globalTeardown;