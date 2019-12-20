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
            "token": "1886a65e1856b824a6e73c91567b87d3a8414085",
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
