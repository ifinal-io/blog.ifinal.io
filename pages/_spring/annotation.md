---
formatterOff: "@formatter:off"
title: Spring Annotations
subtitle: Spring中那些不得不知晓的注解。
summary: API接口
categories: []
tags: []
date: 2023-03-07 13:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

|    `@Annotation`    |             `Bean`              |           `Processor`            |                             `功能`                              |
|:-------------------:|:-------------------------------:|:--------------------------------:|:-------------------------------------------------------------:|
|    `@Component`     |                                 |                                  |                                                               |
|  `@ComponentScan`   |      `ConfigurationClass`       | `ComponentScanAnnotationParser`  |     [Spring 组件扫描](/spring/ioc/annotations/component-scan)     |
| `@ExceptionHandler` | `ServletInvocableHandlerMethod` | `ExceptionHandlerMethodResolver` | [Spring MVC异常处理机制](/spring/mvc/annotations/exception-handler) |
| `@ControllerAdvice` |     `ControllerAdviceBean`      | `ExceptionHandlerMethodResolver` |                                                               |



