import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync } from 'fs';

const input = {
  main:      resolve(__dirname, 'index.html'),
  about:     resolve(__dirname, 'about.html'),
  contact:   resolve(__dirname, 'contact.html'),
  products:  resolve(__dirname, 'products.html'),
  equipment: resolve(__dirname, 'equipment-as-a-service.html'),
  // Blog pages — add new articles here
  blog:           resolve(__dirname, 'blog/index.html'),
  blogPem:        resolve(__dirname, 'blog/pem-vs-aem-vs-alkaline-electrolyzer-india.html'),
  blogCost:       resolve(__dirname, 'blog/green-hydrogen-generator-cost-india.html'),
  blogEaas:       resolve(__dirname, 'blog/equipment-as-a-service-hydrogen-research-india.html'),
  blogCcus:       resolve(__dirname, 'blog/ccus-co2-reduction-india.html'),
  blogFuelCell:   resolve(__dirname, 'blog/fuel-cell-systems-india.html'),
};

const catalogPath = resolve(__dirname, 'Catalog/index.html');
if (existsSync(catalogPath)) {
  input.catalog = catalogPath;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
});

