---
formatterOff: "@formatter:off"
title: 缓存
subtitle: final-annotation-cache 
summary: final-annotation-cache
categories: []
tags: [] 
date: 2022-03-09 13:59:42 +800 
version: 1.0
formatterOn: "@formatter:on"
---



## 引入依赖

```xml
<dependency>
    <artifactId>final-boot-starter-cache</artifactId>
    <groupId>org.ifinalframework.boot</groupId>
    <version>${latest.release.version}</version>
</dependency>
```

> 注意：请将 `${latest.release.version}` 更改为实际的版本号。

## 声明缓存

```java
public interface DemoService{
    @Cacheable(key="demo:#{#id}")
    DemoEntiy findById(Long id);
}

public class DemoServiceImpl implements DemoService{
    
    @Resource
    private DemoEntiyMapper demoEntityMapper;
    
    @Override
    public DemoEntity findById(Long id){
        return demoEntityMapper.selectOne(id);
    }
}
```

> 注意：`DemoEntity`和`DemoEntityMapper`请查看[ORM](orm)小节。