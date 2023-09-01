---
formatterOff: "@formatter:off"
title: 对象关系映射
subtitle: 对象关系映射
summary: 对象关系映射
categories: [] 
tags: [] 
date: 2022-03-08 13:30:18 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# CRUD

业务系统中少不了大量的CRUD操作，final提供了一系列的方法方便开发者对数据进行CRUD操作。


## ORM

### Annotations

|     注解      |            功能            |
| :-----------: | :------------------------: |
|   `@Table`    | 指定实体与数据表的映射关系 |
|   `@Column`   | 指定属性与数据列的映射关系 |
| `@PrimaryKey` |      指定该属性为主键      |
|    `@Final`     |                指定不可修改                |
|   `@Default`    |                指定不需插入                |
|   `@Keyword`    |                   关键字                   |
|     `@Json`     |                    Json                    |
|  `@PrimaryKey`  |                    主键                    |
|   `@AutoInc`    |                    自增                    |
|   `@ReadOnly`   |                    只读                    |
|  `@Transient`   |                  非数据列                  |
|  `@WriteOnly`   |                    只写                    |
|   `@Virtual`    |                   虚拟列                   |
|   `@Version`    | 版本,更新时自动执行`version = version + 1` |
|   `@Created`    |         创建时间, @Final,@Default          |
|   `@Creator`    |                创建,@Final                 |
| `@LastModified` |                末次修改时间                |
| `@LastModifier` |                 末次修改人                 |
|                 |                                            |
|                 |                                            |

### Built-In

#### AbsEntity

`AbsEntity`是内置的基础实体模型，该模型定义了常用的表数据列，如**版本号**、**创建时间**、**最后修改时间**、**有效标记**等。

|      属性      |      类型       |     说明     |              备注              |
| :------------: | :-------------: | :----------: | :----------------------------: |
|      `id`      |     `Long`      |   自增主键   |                                |
|   `version`    |    `Integer`    |    版本号    |          `DEFAULT 1`           |
|   `created`    | `LocalDateTime` |   创建时间   |         `DEFAULT NOW`          |
| `lastModified` | `LocalDateTime` | 最后修改时间 | `DEFAULT NULL ON UPDATE NOW()` |
|      `yn`      |     `Enum`      |   有效标记   |          `DEFAULT 1`           |

> **注意**：
>
> * `version`被`@Version`标记，该属性会在生成`update`操作时时拼接上`${version} = ${version} + 1`；
> * `createed`被`@Default`标记，在定义表时需要指定默认值为`DEFAULT NOW()`；
> * `lastModified`被`@ReadOnly`标记，在定义表时需要指定更新值为`DEFUALT NULL ON UPDATE NOW()`；
> * `yn`被`@Default`标记，在定义表时需要指定默认值为`DEFAULT 1`；
>

初始化`sql`片段如下：

```sql
CREATE TABLE {your_table_name}
(
    id            BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '流水号',
    version       INT(11)    NOT NULL DEFAULT 1 COMMENT '版本号',
    created       DATETIME   NOT NULL DEFAULT NOW() COMMENT '创建时间',
    last_modified DATETIME   NULL     DEFAULT NULL ON UPDATE NOW() COMMENT '最后修改时间',
    yn            INT(11)    NOT NULL DEFAULT 1 COMMENT '有效标记，1：有效，0：无效',
    PRIMARY KEY (id)
)
```


## Repository

Repository封装了常用的数据CRUD方法。

### Methods

|      方法       | 功能                                                         |
|:-------------:| ------------------------------------------------------------ |
|   `insert()`    | 插入数据，当数据存在唯一约束冲突时会抛出重复键异常。         |
|   `replace()`   | 插入数据，当数据存在唯一约束时，会替换数据，为原子性操作，参考`REPLACE INTO`。 |
|    `save()`     | 插入数据，当数据存在唯一约束冲突时，会更新数据，为原子操作，参考SQL `INSERT INTO ... ON DUPLICATE KEY UPDATE `。 |
|   `select()`    | 批量查询，返回数据列表。                                     |
|  `selectOne()`  | 单条查询，返回单条数据。                                     |
|  `selectIds()`  | 批量查询，返回数据ID列表。                                   |
| `selectCount()` | 统计查询，返回数据数量。                                     |
|  `isExistis()`  | 查询指定数据是否存在。                                       |
|    `update`     | 更新数据表中的数据。                                         |
|   `delete()`    | 删除数据表中的数据。                                         |
|  `truncate()`   | 清空数据表。                                                 |

### 参数

|     参数      | 说明                                          |
|:-----------:|:--------------------------------------------|
|   `table`   | 表名，适用于实体模型与数据表一对多的场景，如分表                    |
|   `view`    | 视图，适用于不同业务场景下，操作不同数据表的场景                    |
|  `ignore`   | 忽略，适用于INSERT时是否忽略重复数据，即`INSERT IGNORE INTO` |
|   `list`    | 实体列表，适用于向数据表中插入数据的场景                        |
| `selective` | 可选择的，适用于更新场景下，只更新非空的数据列                     |
|  `update`   | 更新数据集合，适用于更新场景                              |
|  `entity`   | 实体数据，适用于更新场景                                |
|    `id`     | ID，适用于通过ID查询单个数据                            |
|    `ids`    | ID集合，适用于通过ID删除、更新、查询场景                      |
|   `query`   | 条件对象，适用于删除、更新、查询场景                          |

### 方法与参数

|                 | `table` | `view` | `ignore` | `list` | `selective` | `update` | `entity` | `id` | `ids` | `query` |
| :-------------: | :-----: | :----: | :------: | :----: | :---------: | :------: | :------: | :--: | :---: | :-----: |
|   `insert()`    |  可选   |  可选  |   可选   |  非空  |      -      |    -     |    -     |  -   |   -   |    -    |
|   `replace()`   |  可选   |  可选  |    -     |  非空  |      -      |    -     |    -     |  -   |   -   |    -    |
|    `save()`     |  可选   |  可选  |    -     |  非空  |      -      |    -     |    -     |  -   |   -   |    -    |
|   `select()`    |  可选   |  可选  |    -     |   -    |      -      |    -     |    -     |  -   |   -   |  可选   |
|  `selectOne()`  |  可选   |  可选  |    -     |   -    |      -      |    -     |    -     | 可选 |   -   |  可选   |
|  `selectIds()`  |  可选   |   -    |    -     |   -    |      -      |    -     |    -     |  -   | 可选  |  可选   |
| `selectCount()` |  可选   |   -    |    -     |   -    |      -      |    -     |    -     |  -   | 可选  |  可选   |
|  `isExists()`   |  可选   |   -    |    -     |   -    |      -      |    -     |    -     |  -   | 可选  |  可选   |
|   `update()`    |  可选   |  可选  |    -     |   -    |    可选     |   可选   |   可选   |  -   | 可选  |  可选   |
|   `delete()`    |  可选   |   -    |    -     |   -    |      -      |    -     |    -     |  -   | 可选  |  可选   |
|  `truncate()`   |  可选   |   -    |    -     |   -    |      -      |    -     |    -     |  -   |   -   |    -    |

## Query

