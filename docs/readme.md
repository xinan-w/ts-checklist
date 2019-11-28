#### 初始化项目
```
    mkdir ts-checklist
    code ts-checklist
    touch index.ts
    cd index.ts
    写入 console.log('hello ts-checklist')

    yarn add ts-node typescript @types/node tslint

    运行 
    yarn ts-node index.ts
```
#### Husky
```
    这里深入介绍一款神器，也就是 Husky。Husky 可以为 Git 加入钩子，让 Git 命令在执行前执行一些特定的行为。
    比如，在提交代码前或推送代码前，我们都可以用 Husky 检查一下代码是否符合 TSLint 规范。
    接下来我们将演示一下如何在提交之前强制执行 TSLint。
    先执行如下命令来安装 Husky：

    yarn add husky --dev
    
    然后再打开 package.json，添加以下内容：
    "husky": {
        "hooks": {
        "pre-commit": "yarn tslint -c tslint.json'./**/*.ts'"
        }
    }