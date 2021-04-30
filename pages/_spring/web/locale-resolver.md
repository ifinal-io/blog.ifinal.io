---
formatter: "@formatter:off"
title: '@LocaleResolver'
subtitle: locale-resolver 
summary: locale-resolver 
tags: [] 
date: 2021-04-30 14:49:16 +800 
version: 1.0
formatter: "@formatter:on"
---

# LocaleResolver

## What

`LocaleResolver`是SpringMVC定义的基于Web的语言环境策略接口，用于解析当前请求所接收的语言环境，为项目的国际化提供支持。

## Init

在`DispatchServlet`的`initLocaleResolver()`方法中，有这样一段代码：

```java
// 	public static final String LOCALE_RESOLVER_BEAN_NAME = "localeResolver";
this.localeResolver=context.getBean(LOCALE_RESOLVER_BEAN_NAME,LocaleResolver.class);
```

而`LOCALE_RESOLVER_BEAN_NAME`的值为`localeResolver`，想必此刻，小伙伴们应该都明白了自在定义`LocaleResolver`时，
`bean`的名称为什么必须声明为`localeResolver`了吧，这就是根本原因所在。

## How

### CookieLocaleResolver
