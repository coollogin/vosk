module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          {
            "provider": "github",
            "private": true,
            "owner": "coollogin",
            "repo": "vosk",
            "token": "6b0a4e78d65ef9a05a5bab4ced6909ca93e99fd3",
            "releaseType": "draft"
          }
        ]
      },
      // List native deps here if they don't work
      externals: ['easyvk', 'firebase'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}
