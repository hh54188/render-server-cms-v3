# Alpha 0.0.0

## 初始化项目：

借助于 Yeoman 其中的一个 generator ：[generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack);

安装 Yeoman 相关组件
```
- npm install -g yo
- npm install -g generator-react-webpack
```

初始化项目：
```
mkdir my-new-project && cd my-new-project
yo react-webpack
```

生成新的组件：
```
yo react-webpack:component my/namespaced/components/name
```

启动项目：
```
# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Auto-run unit tests on file changes
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```



