---
formatterOff: "@formatter:off"
title: Final Validation
subtitle: 动态分组
summary: 动态分组
categories: [] 
tags: [] 
date: 2023-04-01 09:53:35 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# Final Validation

基于Spring Validation原理，提供了全局的分组校验支持。

## 动态分组

### 全局分组校验

```java
package org.ifinalframework.validation;

@FunctionalInterface
public interface GlobalValidationGroupsProvider {
    @NonNull
    List<Class<?>> getValidationGroups();
}
```

### 方法动态分组校验

默认情况下，Spring 提供的分组校验只支付静态分组，即通过`@Validated`的`value()`属性来显示指定。

通过了解 Spring 的分组校验原理，实现了自定义的方法级动态分组校验。

```java
package org.ifinalframework.validation;
public interface MethodValidationGroupsProvider {

    @Nullable
    List<Class<?>> getValidationGroups(@NonNull Method method, @NonNull Object target, @NonNull Object[] args);
}
```