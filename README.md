# Yarn release plugin

## Install

```sh
yarn plugin import https://raw.githubusercontent.com/RuBAN-GT/yarn-plugin-release/main/bundles/%40yarnpkg/plugin-release.js
```

## Commands

* `yarn release graph` - prints monitored workspaces graph
  * `-o, --output-format` can be `json` or `tree`
* `yarn release version check` - prints changed workspaces with related chunks
* `yarn release version chunks` - prints changed workspaces in topological order grouped by chunks.
  * `-g, --group-by` the count of chunks
