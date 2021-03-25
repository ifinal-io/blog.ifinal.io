---
formatter: "@formatter:off"
title: HandlerInterceptor（处理器拦截器）
subtitle: handler-interceptor 
summary: handler-interceptor 
tags: [spring,web] 
date: 2021-03-24 22:06:21 +800 
version: 1.0
formatter: "@formatter:on"
---

# HandlerInterceptor

## 简介（What）

`HandlerInterceptor`是Spring提供的用于拦截`HandlerMethod`的扩展接口，类似于Servlet的过滤器(`Filter`)。

## 定义（Definition）

其定义如下：

```java
package org.springframework.web.servlet;

public interface HandlerInterceptor {
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }
}
```

## 注册（Registration）

`HandlerInterceptor`有多种注册方式：

1. 继承`WebMvcConfigurerAdapter`，在Spring 5.0 之前主要的使用方式（Java 7不支持默认方法），在此之后，已被标记`@Deprecated`。
2. 继承`WebMvcConfigurationSupport`，但是会导致Spring Boot对MVC自动装配的失效，不推荐使用。
3. 实现`WebMvcConfigurer`，推荐使用。

> 继承`WebMvcConfigurationSupport`导致Spring Boot 
> MVC自动配置失效的原因是`WebMvcAutoConfiguration`配置类的配置条件有`@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})`。




