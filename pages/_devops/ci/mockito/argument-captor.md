---
formatter: "@formatter:off"
title: ArgumentCaptor
subtitle: argument-captor 
summary: 参数捕获器
tags: [junit,mockito] 
date: 2021-03-19 23:20:04 +800 
version: 1.0
formatter: "@formatter:on"
---

# ArgumentCaptor

## What

`ArgumentCaptor`是`Mockito`提供用于捕获方法参数的工具类。

## Feature

* `forClass()`：创建参数捕获实例
* `capture()`：捕获参数
* `getValue()/getAllValues()`：获取末次/所有参数值

## Usage

```java
   ArgumentCaptor<Person> argument = ArgumentCaptor.forClass(Person.class);
   verify(mock).doSomething(argument.capture());
   assertEquals("John", argument.getValue().getName());
```