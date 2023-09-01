---
formatterOff: "@formatter:off"
title: final-annotation-data 
subtitle: final-annotation-data 
summary: final-annotation-data
categories: [] 
tags: [] 
date: 2021-09-26 15:12:56 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# Final Annotation Data

Final Annotation Data 定义了大量的`ORM`注解。

## Annotations

### \@Table

`@Table`注解可显示指定实现模型(`Entity`)与数据表（`Table`）之间的映射关系

### \@Column

fds

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

## Built-In

### AbsEntity

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

