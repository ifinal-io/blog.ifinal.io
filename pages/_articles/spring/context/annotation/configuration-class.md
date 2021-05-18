---
formatterOff: "@formatter:off"
title: Spring Ioc 那些含有特定功能的配置类
subtitle: configuration-class 
summary: Spring Ioc 那些含有特定功能的配置类
typed:
  - '@Component.'
  - '@Configuration.'
  - '@ComponentScan.'
  - '@Import.'
  - '@ImportResource.'
categories: [spring]
tags: [spring,ioc] 
date: 2021-01-22 16:49:09 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# ConfigurationClass

## What

> **配置类(`ConfigurationClass`)是一种含有特殊标记的`BeanDefiniton`。**

Spring将一些含有特殊的`BeanDefinition`称为**配置类**`ConfigurationClass`，这些配置类极大地提高了Spring的**可扩展性**及开发人员的**工作效率**。如：

* 使用`@Component`标记组件类，配合`@ComponentScan`，减少`<beans>.xml`的声明；
* 使用`@ImportResource`标记声明需要导入的的资源；
* 使用`@Import`注解自定义需要导入的类；
* ……



## Definition

在了解配置类之前，先看看其是如何定义的。

通过查看`ConfigrurationClass`的源码发现，该类是Spring框架的一个*‘内部类’*（非`public`）。核心源码如下：

```java
package org.springframework.context.annotation;

final class ConfigurationClass {

    // 注解元数据
    private final AnnotationMetadata metadata;

    private final Resource resource;

    @Nullable
    private String beanName;

    private final Set<ConfigurationClass> importedBy = new LinkedHashSet<>(1);

    // 被 @Bean 标记的方法
    private final Set<BeanMethod> beanMethods = new LinkedHashSet<>();

    // @ImportResource 声明的资源
    private final Map<String, Class<? extends BeanDefinitionReader>> importedResources =
            new LinkedHashMap<>();

    // @Import 声明的注册器
    private final Map<ImportBeanDefinitionRegistrar, AnnotationMetadata> importBeanDefinitionRegistrars =
            new LinkedHashMap<>();

    final Set<String> skippedBeanMethods = new HashSet<>();

}
```

各属性的含义如下：

|               属性               |         类型         |            备注             |
| :------------------------------: | :------------------: | :-------------------------: |
|            `metadata`            | `AnnotationMetaData` |        配置类元数据         |
|            `resource`            |      `Resource`      |                             |
|            `beanName`            |       `String`       |            名称             |
|           `importdBy`            |        `Set`         |                             |
|          `beanMethods`           |        `Map`         |     被`@Bean`标记的方法     |
|       `importedResources`        |        `Map`         | `@ImportResource`声明的资源 |
| `importBeanDefinitionRegistrars` |        `Map`         |    `@Import`声明的注册器    |

这其中有几个比较重要的属性，如

* 用于描述配置类元数据的`metadata`；
* 描述被`@Bean`注解标记的方法的`beanMethods`；
* 描述`@ImportResource`注解标记的资源`importedResources`；
* 描述`@Import`注解声明的`ImportBeanDefinitionRegistrar`。

## How

了解了配置类的定义，那么如何判定一个`BeanDefiniton`是否是`ConfigurationClass`呢？

Spring提供了工具类`ConfigurationClassUtils`的`checkConfigurationClassCandidate()`方法来检测一个`BeanDefinition`是否是配置类。

### checkConfigurationClassCandidate()

该方法中有几个核心的代码片段：

* 不含有工厂方法

```java
if(className==null||beanDef.getFactoryMethodName()!=null){
    return false;
}
```

* 未实现特定接口

```java
if(BeanFactoryPostProcessor.class.isAssignableFrom(beanClass)||
    BeanPostProcessor.class.isAssignableFrom(beanClass)||
    AopInfrastructureBean.class.isAssignableFrom(beanClass)||
    EventListenerFactory.class.isAssignableFrom(beanClass)){
    return false;
}
```

* 被`@Configuration`标记或是`isConfigurationCandidate(metadata)`

```java
Map<String, Object> config=metadata.getAnnotationAttributes(Configuration.class.getName());
if(config!=null&&!Boolean.FALSE.equals(config.get("proxyBeanMethods"))){
    beanDef.setAttribute(CONFIGURATION_CLASS_ATTRIBUTE,CONFIGURATION_CLASS_FULL);
}else if(config!=null||isConfigurationCandidate(metadata)){
    beanDef.setAttribute(CONFIGURATION_CLASS_ATTRIBUTE,CONFIGURATION_CLASS_LITE);
}else{
    return false;
}
```

### isConfigurationCandidate()

* 非接口

```java
// Do not consider an interface or an annotation...
if (metadata.isInterface()) {
	return false;
}
```

* 含有特定标记

```java
// Any of the typical annotations found?
for (String indicator : candidateIndicators) {
	if (metadata.isAnnotated(indicator)) {
		return true;
	}
}

// candidateIndicators 定义与初始化
private static final Set<String> candidateIndicators = new HashSet<>(8);

static {
	candidateIndicators.add(Component.class.getName());
	candidateIndicators.add(ComponentScan.class.getName());
	candidateIndicators.add(Import.class.getName());
	candidateIndicators.add(ImportResource.class.getName());
}
```

* 含有`@Bean`标记的方法

```java
// Finally, let's look for @Bean methods...
try {
    return metadata.hasAnnotatedMethods(Bean.class.getName());
} catch (Throwable ex) {
    if (logger.isDebugEnabled()) {
        logger.debug("Failed to introspect @Bean methods on class [" + metadata.getClassName() + "]: " + ex);
    }
    return false;
}
```

至此，判定一个`BeanDefinition`是否是`ConfigurationClass`就结束了。

## End

通过对源码的分析，一个**配置类(`ConfigurationClass`)**应符合以下规则：

* 不含有工厂方法
* 未实现以下接口：
  * BeanFactoryPostProcessor
  * BeanPostProcessor
  * AopInfrastructureBean
  * EventListenerFactory
* 非接口或注解；
* 被以下注解标记：
  * Configuration
  * Component
  * ComponentScan
  * Import
  * ImportResource

* 或含有`@Bean`标记的方法