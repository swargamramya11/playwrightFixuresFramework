import { execSync } from 'child_process';

async function globalTeardown() {
  console.log("Generating Allure Report...");

  execSync(
    'npx allure generate test-results/allure-results -o test-results/allure-report --clean --single-file',
    { stdio: 'inherit' }
  );

  console.log("Allure Report Generated!");
}

export default globalTeardown;