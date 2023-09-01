---
formatterOff: "@formatter:off"
title: 分页
subtitle: 全局分页插件
summary: page
categories: []
tags: []
date: 2022-04-05 13:35:17 +800
version: 1.0
formatterOn: "@formatter:on"
---

# Page

Final定义了分页查询接口，只要参数列表中含有该参数且满足分页条件，即可实现分页查询。

## Pageable

`Pageable`接口定义了分页查询必要的参数。

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


