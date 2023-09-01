---
formatterOff: "@formatter:off"
title: 自动装配
subtitle: 自动装配
summary: 自动装配
categories: []
tags: []
date: 2023-03-01 13:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

# 自动装配

使用过`Spring Boot`的同学都被其**开箱即用**的方式所折服，那么`Spring Boot`是如何实现**开箱即用**的呢？

这要归功于其强大的**自动装配**能力，本节就来一探究竟。


## @EnableAutoConfiguration

`@EnableAutoConfiguration`是Spring Boot自动装配的入口，Spring容器在启动时会检测到该注解上的`@Import`注解，
并调用`AutoConfigurationImportSelector#selectImports(AnnotationMetadata)`方法来解析需要自动装配的配置。

> 在实际的开发中，并没有显示声明`@EnableAutoConfiguration`注解，为什么自动装配也启用了呢？
> **答**：这是因为在Spring Boot的启动类上声明了`@SpringBootConfiguration`注解，而该注解被`@EnableAutoConfiguration`标记，即传递性。
>
> ```java
> ...
> @EnableAutoConfiguration
> ...
> public @interface SpringBootApplication {
> ...
> }
> ```



## AutoConfigurationImportSelector

`AutoConfigurationImportSelector`类实现了自动装配的过程，在该类的`#selectImports(AnnotationMetadata)`方法中，通过解析声明在`@EnableAutoConfiguration`注解中的配置来加载候选配置类。



候选配置类的来源有以下两种：

* `META-INF/spring.facotries`
* `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`

其中`spring.factories`中的候选类通过`SpringFactoriesLoader.loadFactoryNames()`进行加载，`org.springframework.boot.autoconfigure.AutoConfiguration.imports`中的候选类通过`ImportCandidates.load()`进行加载。

* getCandidateConfigurations

```java
	protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
		List<String> configurations = new ArrayList<>(
				SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader()));
		ImportCandidates.load(AutoConfiguration.class, getBeanClassLoader()).forEach(configurations::add);
		Assert.notEmpty(configurations,
				"No auto configuration classes found in META-INF/spring.factories nor in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports. If you "
						+ "are using a custom packaging, make sure that file is correct.");
		return configurations;
	}
```

> **ImportCandidates**自`Spring Boot 2.7.0`开始。
