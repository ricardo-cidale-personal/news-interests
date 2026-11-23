// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ricardo-cidale-personal.github.io',
  base: '/news-interests',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
