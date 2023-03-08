const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    api_url: 'http://localhost:3022',
    bearer:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3ODI2Njc5MywiZXhwIjoxNjgwODU4NzkzLCJpc3MiOiJsZWFwc29tZSJ9.BqbO4T7d_sWMpjYlJ3hq3MNhvGARK62VGAyo3sKQI04',
  },
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})
