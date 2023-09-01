---
formatterOff: "@formatter:off"
title: 资源导入
subtitle: import-resource 
summary: import-resource
categories: [] 
tags: [] 
date: 2022-03-06 14:10:12 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# 资源导入

开发者可以使用`@ImportResource`注解可以将特定的Bean资源导入到Spring容器中，为简化资源导入的配置，final内置了资源导入。

* `classpath:spring-config-*.xml`
* `classpath*:config/spring-config-*.xml`
* `classpath*:spring/spring-config-*.xml`

开发者可以使用`spring.application.import-resource.locations`来指定自定义的资源导入，或者使用`@ImportResource`注解。
也可以使用`spring.application.import-resource.use-default=false`配置来取消默认的资源导入。