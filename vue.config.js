module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          {
            "provider": "github",
            "private": true,
            "owner": "coollogin",
            "repo": "VosK",
            "token": "f5bbe92c15cb500d2f8dfd99695944e6897c23f4",
            "releaseType": "draft"
          }
        ]
      },
      // List native deps here if they don't work
      externals: ['easyvk', 'mongoose'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}
