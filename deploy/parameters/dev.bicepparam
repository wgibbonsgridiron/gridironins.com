using '../main.bicep'

param environment = 'dev'
param staticWebAppName = 'gridironins-dev'
param sku = 'Free'
param repositoryUrl = 'https://github.com/YOUR_ORG/gridironins.com'
param branch = 'dev'
param tags = {
  project: 'gridironins'
  environment: 'dev'
  managedBy: 'bicep'
}
