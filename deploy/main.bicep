targetScope = 'resourceGroup'

@description('The environment name (dev, prod)')
param environment string

@description('The location for all resources')
param location string = resourceGroup().location

@description('The name of the Static Web App')
param staticWebAppName string

@description('The SKU for the Static Web App')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('The repository URL for the Static Web App')
param repositoryUrl string

@description('The branch name for deployment')
param branch string

@description('Tags to apply to all resources')
param tags object = {}

// Static Web App
module staticWebApp 'modules/static-web-app.bicep' = {
  name: 'staticWebAppDeployment'
  params: {
    name: staticWebAppName
    location: location
    sku: sku
    repositoryUrl: repositoryUrl
    branch: branch
    tags: union(tags, {
      environment: environment
    })
  }
}

// Application Insights for monitoring (optional but recommended)
module appInsights 'modules/app-insights.bicep' = {
  name: 'appInsightsDeployment'
  params: {
    name: '${staticWebAppName}-insights'
    location: location
    tags: union(tags, {
      environment: environment
    })
  }
}

// Outputs
output staticWebAppId string = staticWebApp.outputs.staticWebAppId
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppApiKey string = staticWebApp.outputs.apiKey
output appInsightsInstrumentationKey string = appInsights.outputs.instrumentationKey
output appInsightsConnectionString string = appInsights.outputs.connectionString
