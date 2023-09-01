---
formatterOff: "@formatter:off"
title: Final Annotation Core
subtitle: result
summary: Final Annotation Core
categories: [final]
tags: []
date: 2021-07-02 16:49:20 +800
version: 1.0
formatterOn: "@formatter:on"
---

# Final Annotation Core

`final annotaion core`定义了`final`的基础接口与注解。

## 超接口

`final`定义了一系列的超接口，这些超接口为框架提供了设计基础。

* `IEntity`：实体模型接口，该接口以实现统一的CRUD操作。
* `IEnum`：枚举接口，该接口以实现枚举类型的增强。

## Result

`final`使用`Result`对象来统一描述业务返回结果，当业务数据包含分页信息时，使用`Pagination`描述。

* 常规

```json
{
  "status": 0,
  "description": "success",
  "code": "0",
  "message": "success",
  "data": "hello final!",
  "trace": "7aba435f-69d2-4c44-a944-315107623a92",
  "timestamp": 1605063263491,
  "duration": 0.063,
  "address": "127.0.0.1:80",
  "locale": "en",
  "timeZone": "Asia/Shanghai",
  "success": true
}
```

* 分页（Pagination）

```json
{
  "status": 0,
  "description": "success",
  "code": "0",
  "message": "success",
  "data": [
    {}
  ],
  "pagination": {
    "page": 1,
    "size": 1,
    "pages": 1,
    "total": 1,
    "firstPage": true,
    "lastPage": 1
  },
  "trace": "7aba435f-69d2-4c44-a944-315107623a92",
  "timestamp": 1605063263491,
  "duration": 0.063,
  "address": "127.0.0.1:80",
  "locale": "en",
  "timeZone": "Asia/Shanghai",
  "success": true
}
```
