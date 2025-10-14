@description('The name of the Static Web App')
param name string

@description('The location for the Static Web App')
param location string

@description('The SKU for the Static Web App')
@allowed([
  'Free'
  'Standard'
])
param sku string

@description('The repository URL')
param repositoryUrl string

@description('The branch name')
param branch string

@description('Tags to apply to the resource')
param tags object

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: name
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'dist'
    }
    provider: 'GitHub'
  }
}

// Custom domain (optional - uncomment and configure if needed)
// resource customDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = {
//   parent: staticWebApp
//   name: 'www.gridironins.com'
//   properties: {}
// }

output staticWebAppId string = staticWebApp.id
output defaultHostname string = staticWebApp.properties.defaultHostname
output apiKey string = listSecrets(staticWebApp.id, staticWebApp.apiVersion).properties.apiKey
