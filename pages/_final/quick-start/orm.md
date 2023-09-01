---
formatterOff: "@formatter:off"
title: 对象关系映射
subtitle: 对象关系映射
summary: 对象关系映射
categories: [] 
tags: [] 
date: 2022-03-09 13:30:18 +800 
version: 1.0
formatterOn: "@formatter:on"
---



## 引入依赖

```xml
<dependency>
    <artifactId>final-boot-starter-entity</artifactId>
    <groupId>org.ifinalframework.boot</groupId>
    <version>${latest.release.version}</version>
</dependency>
<dependency>
    <artifactId>final-boot-starter-mybatis</artifactId>
    <groupId>org.ifinalframework.boot</groupId>
    <version>${latest.release.version}</version>
</dependency>
```

> 注意：请将 `${latest.release.version}` 更改为实际的版本号。

## 定义实体

```java
@Data
public class DemoEntity implements IEntity<Long>{
    @AutoInc
    @PrimaryKey
    private Long id;
    private String name;
    @Json
    private Map<String,Object> properties;
    @Version
    private Long version;
    @Created
    private LocalDateTime created;
    @LastModified
    private LocalDateTiem lastModified;
    @Default
    private YN yn;
}
```

## 初始化表

```sql
CREATE TABLE demo_entity
(
    id            BIGINT(20) 	NOT NULL AUTO_INCREMENT COMMENT '流水号',
    name		  VARCHAR(200) 	NOT NULL 				COMMENT '名称',
    properties    JSON		 	NULL 					COMMENT '扩展属性',
    version       INT(11)    	NOT NULL DEFAULT 1 		COMMENT '版本号',
    created       DATETIME   	NOT NULL DEFAULT NOW() 	COMMENT '创建时间',
    last_modified DATETIME   	NULL     DEFAULT NULL ON UPDATE NOW() COMMENT '最后修改时间',
    yn            INT(11)    	NOT NULL DEFAULT 1 COMMENT '有效标记，1：有效，0：无效',
    PRIMARY KEY (id)
)
```

## Mapper定义与使用

```java
public interface DemoEntityMapper extends AbsMapper<Long,DemoEntity>{
    
}
```

* 插入数据

```java
DemoEntity entity = new DemoEntity();
// 插入默认表
demoEntityMapper.insert(entity);
// 插入指定表
demoEntityMapper.insert(table,entity);
```

* 查询数据

```java
// 根据ID批量查询
List<DemoEntity> list = demoEntityMapper.select(ids);
// 根据Query批量查询
Query query = new Query();
List<DemoEntity> lust = demoEntityMapper.select(query);

// 根据ID单个查询
DemoEntity entity = demoEntityMapper.selectOne(id);
Query query = new Query();
DemoEntity entity = demoEntityMapper.selectOne(query);

List<Long> ids = demoEntityMapper.selectIds(query);

Long count = demoEntityMapper.selectCount(query);
```

* 更新数据

```java
DemoEntity entity = new DemoEntity();
entity.setId(1L);
// 设置更新属性
entity.setXXX(xxx);
// 更新默认表
demoEntityMapper.update(entity);
// 更新指定表
demoEntityMapper.update(table,entity);
```

* 查询数据

```java
// 根据ID批量查询
List<DemoEntity> list = demoEntityMapper.select(ids);
// 根据Query批量查询
Query query = new Query();
List<DemoEntity> lust = demoEntityMapper.select(query);

// 根据ID单个查询
DemoEntity entity = demoEntityMapper.selectOne(id);
Query query = new Query();
DemoEntity entity = demoEntityMapper.selectOne(query);

List<Long> ids = demoEntityMapper.selectIds(query);

Long count = demoEntityMapper.selectCount(query);
```

* 删除数据

```java
int rows = demoEntityMapper.delete(ids);
int rows = demoEntityMapper.delete(query);

demoEntityMapper.truncate();
```



