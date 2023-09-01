---
formatterOff: "@formatter:off"
title: mapper
subtitle: mapper
summary: mapper
categories: []
tags: []
date: 2022-04-05 15:07:49 +800
version: 1.0
formatterOn: "@formatter:on"
---

# Mapper

Final Mybatis 提供了通用CRUD接口`AbsMapper`，通过该Mapper，开发者可以快速实现单表的增删改查操作。

## Insert

```java
// 向默认表插入一条或多条数据
insert(entity1,entity2);
// 向指定表插入数据
insert(table,entity);
// 插入数据，且忽略已经还在的数据
insert(ignore,entity);
// 使用视图插入数据
insert(view,entity);
```

* **参数说明**

|   参数名    |        类型        | 非空  |    说明    |
|:--------:|:----------------:|:---:|:--------:|
| `table`  |      String      |  N  |    表名    |
|  `view`  |      Class       |  N  |    视图    |
| `ignore` |     boolean      |  N  | 忽略唯一约束冲突 |
|  `list`  | Array/Collection |  Y  |   数据列表   |

> 与`insert`类似的还有`replace`和`save`方法，都为原子性操作，分别对应`REPLACE INTO`和`INSERT INTO ... ON DUPLICATE KEY`。


## Update

```java
// 更新实体（通过ID）
update(entity);
// 更新实体（通过Query）
update(entity,query);
// 更新指定表
update(table,entity,query);
// 更新非空属性
update(selective,entity,query);
```

* **参数说明**

|     参数名     |        类型        | 非空  |   说明    |
|:-----------:|:----------------:|:---:|:-------:|
|   `table`   |      String      |  N  |   表名    |
|   `view`    |      Class       |  N  |   视图    |
| `selective` |     boolean      |  N  | 更新非空属性  |
|  `update`   |      Update      |  N  |   更新列   |
|  `entity`   |      Entity      |  N  |  数据实体   |
|    `ids`    | Array/Collection |  N  |  ID列表   |
|   `query`   |      IQuery      |  N  | Query条件 |

> `update`和`entity`不能同时为`null`。
> `ids`和`query`不能同时为`null`。

## Select

### select

```java
// 通过IDS查询
select(ids);
// 通过Query查询
select(query);
// 查询指定表
select(table,ids);
// 使用视图查询
select(view,ids);
```
* **参数说明**

|     参数名     |        类型        | 非空  |   说明    |
|:-----------:|:----------------:|:---:|:-------:|
|   `table`   |      String      |  N  |   表名    |
|   `view`    |      Class       |  N  |   视图    |
|    `ids`    | Array/Collection |  N  |  ID列表   |
|   `query`   |      IQuery      |  N  | Query条件 |

### selectOne

```java
// 通过ID查询
selectOne(id);
// 通过Query查询
selectOne(query);
// 查询指定表
selectOne(table,id);
// 使用视图查询
selectOne(view,id);
```
* **参数说明**

|    参数名     |   类型   | 非空  |   说明    |
|:----------:|:------:|:---:|:-------:|
|  `table`   | String |  N  |   表名    |
|   `view`   | Class  |  N  |   视图    |
|    `id`    |   ID   |  N  |   ID    |
|  `query`   | IQuery |  N  | Query条件 |

### selectIds


```java
// 通过IDS查询
select(ids);
// 通过Query查询
select(query);
// 查询指定表
select(table,ids);
// 使用视图查询
select(view,ids);
```
* **参数说明**

|     参数名     |        类型        | 非空  |   说明    |
|:-----------:|:----------------:|:---:|:-------:|
|   `table`   |      String      |  N  |   表名    |
|    `ids`    | Array/Collection |  N  |  ID列表   |
|   `query`   |      IQuery      |  N  | Query条件 |

## Delete

```java
// 通过IDS删除
delete(ids);
// 通过Query删除
delete(query);
// 指定表
delete(table,ids);
```

* **参数说明**

|   参数名   |        类型        | 非空  |   说明    |
|:-------:|:----------------:|:---:|:-------:|
| `table` |      String      |  N  |   表名    |
|  `ids`  | Array/Collection |  N  |  ID列表   |
| `query` |      IQuery      |  N  | Query条件 |

## Truncate

```java
// 清空默认表
truncate();
// 清空指定表
truncate(table);
```
* **参数说明**

|   参数名   |        类型        | 非空  |   说明    |
|:-------:|:----------------:|:---:|:-------:|
| `table` |      String      |  N  |   表名    |
