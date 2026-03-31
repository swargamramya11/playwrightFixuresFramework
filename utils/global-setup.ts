import fs from 'fs';

async function globalSetup() {
  if (fs.existsSync('test-results/allure-results')) {
    fs.rmSync('test-results/allure-results', { recursive: true, force: true });
  }
}

export default globalSetup;