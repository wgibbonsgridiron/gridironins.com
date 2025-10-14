using '../main.bicep'

param environment = 'prod'
param staticWebAppName = 'gridironins-prod'
param sku = 'Standard'
param repositoryUrl = 'https://github.com/YOUR_ORG/gridironins.com'
param branch = 'main'
param tags = {
  project: 'gridironins'
  environment: 'prod'
  managedBy: 'bicep'
}
