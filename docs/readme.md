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
        "pre-commit": "yarn tslint -c tslint.json 'src/**/*.ts'"
        }
    }
    接下来在提交代码的时候，Husky 就会自动运行 TSLint 检查代码。
    如果不符合 TSLint 规范，则会直接停止提交。
```
### 定义数据结构
```
    现在，我们要开始思考如何去完成提醒事项清单。
    与大多数的提醒事项清单一样，我们需要记录一下想做什么，可能是急需完成的工作，也可能是需要还款的信用卡，或者是一场重要的家庭会议。我们可以很清楚的知道，我们需要存储的是一个字符串变量，同时，我们还需要一个准确的时间提醒。

    这一切听起来很简单，但别忘了，在定义一个东西之前，我们还得确定它存在哪里，当然，肯定不是内存里，关机数据就消失不是我们所希望的。所以我们先来尝试一下链接数据库。
```
#### 连接数据库
```
    在这里我们选用的数据库是 SQLite3。建议读者到官网下载安装sqlite3。新版本Mac都会预装的。
    数据库有了，接下来需要一个中间件来完成程序和数据库的连接。担当此重任的就是 typeorm，它完美地支持TypeScript，同时还能提供非常友好的代码操作接口。

    然后我们需要创建一个配置文件，这个配置文件将会记录数据库的类型和连接方式。
    在根目录下创建文件ormconfig.json：
    {
        "type": "sqlite",
        "database": "db.sqlite3",
        "autoSchemaSync": true,
        "synchronize": true,
        "logging": true,
        "entities": [
            "src/entity/**/*.ts"
        ],
        "migrations": [
            "src/migration/**/*.ts"
        ],
        "subscribers": [
            "src/subscriber/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }

    其中：
        Entity：指数据模型，或者称为数据实例。
        Migration：指数据库发生变化时历次的迁移文件。
        Subscriber：指数据层的监听器，做一下前置后置操作。
    
    具体使用方法可以参见 typeorm 的文档，这里我们着重讲一下 Entity，数据实例通常映射成一张数据表。
```
#### 定义数据模型
```
    一个提醒事项不仅要包括内容，还有时间，但很容易遗忘的内容就是需要存储。
    所以我们在 src 下创建文件夹 Entity ，再创建文件 workItem.ts：
        import {
            Column,
            CreateDateColumn,
            Entity,
            PrimaryGeneratedColumn,
            UpdateDateColumn,
        } from 'typeorm';

        @Entity()
        export class WorkItem {
            @PrimaryGeneratedColumn()
            public id: number;

            @Column({
                length: 100
            })
            public text: string;

            @Column({default: false})
            public isChecked: boolean;

            @CreateDateColumn({type: 'timestamp'})
            public createdAt: Date;

            @UpdateDateColumn({type: 'timestamp'})
            public updatedAt: Date;
        }

    创建好实例后，再在 index.ts 中连接数据库：
        import {createConnection} from 'typeorm'
        import 'reflect-metadata'

        createConnection()
    
    执行如下命令：
        yarn ts-node src
    
```
### 数据接口
```
    
```