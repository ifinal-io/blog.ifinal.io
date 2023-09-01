---
formatterOff: "@formatter:off"
title: 分页插件
subtitle: pageable-interceptor
summary: pageable-interceptor
categories: []
tags: []
date: 2022-04-05 14:20:20 +800
version: 1.0
formatterOn: "@formatter:on"
---

# PageableInterceptor

`PageableInterceptor`定义的全局分页的入口，从查询参数列表中提取`Pageable`类型的参数并对参数值进行校验，当参数值符合分页条件时，将会触发分布查询。


## Pageable

`Pageable`接口定义了分页查询必要的参数。

* 当`getPage()`和`getSize()`都不为`null`时，将触发分页查询。
* 当`getCount()`值为`true`时，分页查询会统计`count`。

* **接口定义**

```java
package org.ifinalframework.core;

public interface Pageable extends IQuery {

    @Nullable
    Integer getPage();
    void setPage(@Nullable Integer page);

    @Nullable
    Integer getSize();
    void setSize(@Nullable Integer size);

    @Nullable
    Boolean getCount();
    void setCount(@Nullable Boolean count);

}
```

* **参数说明**

| 参数名    | 类型        | 说明  |
|--------|-----------|-----|
| `page` | `Integer` | 页码  |
| `size` | `Integer` | 页面大小 |
| `count` | `Boolean`  | 统计  |


## 致谢

感谢开源项目[PageHelper](https://github.com/pagehelper/Mybatis-PageHelper)提供的分页实现。
