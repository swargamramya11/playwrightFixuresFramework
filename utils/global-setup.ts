import fs from 'fs';

async function globalSetup() {
  if (fs.existsSync('reports/allure-results')) {
    fs.rmSync('reports/allure-results', { recursive: true, force: true });
  }
}

export default globalSetup;