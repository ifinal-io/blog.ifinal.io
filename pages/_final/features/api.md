---
formatterOff: "@formatter:off"
title: API
subtitle: response-body-advice 
summary: response-body-advice
categories: [] 
tags: [] 
date: 2022-03-05 16:38:04 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# API

为简化API接口开发，框架提供了统一的结果



## 统一结果集

为了给接口调用方（如前端）返回统一的接口对象（`Result`），一般情况下，开发者需要编写大量与示例代码类似的重复代码。

```java
@RestControoler
public class ResultControoler{
    @GetMapping("/result")
    public Result<?> result(Params params){
        try{
            // do domething
            return Result.success(data);
        }catch(Exception e){
            return Result.failure(e.getMessage());
        }
    }
}
```
上述模板代码在一个项目中存在大量的重复：

* 每一个Controller方法都需要写try-catch代码块。
* Result的实例化散落各处，对后期扩展不友好。

为解决上述问题，Final对被`@ResponseBody`标记的接口方法的返回值会进行统一的结果集封装。因此，业务开发者仅需要关心业务数据的处理，不需要再对数据进行额外的包装处理。

### 一般场景

* HelloController

```java
package org.ifinalframework.demo;

@RestController
public class HelloController{
    @GetMapping("/hello")
    public String hello(){
        return "hello world!";
    }
}
```

* 结果

```json
{
  "status": 0,
  "description": "success",
  "code": "0",
  "message": "success",
  "data": "hello world!",
  "trace": "7aba435f-69d2-4c44-a944-315107623a92",
  "timestamp": 1605063263491,
  "duration": 0.063,
  "address": "127.0.0.1:80",
  "locale": "en",
  "timeZone": "Asia/Shanghai",
  "success": true
}
```

### 分页场景


**PageController**

```java
@RestController
public class PageController{
    @GetMapping("/page)
    public List<?> page(int page,int size){
        PageHelper.startPage(page.size);
        // do page query
        return ...;
    }

}
```

**PageResult**

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

## Rest Api

Final内置了大量通用的CRUD接口，方便开发者快速实现服务接口开发。

| 操作     | 方法     | path                               | 参数格式 | 参数            |
| -------- | -------- | ---------------------------------- | -------- | --------------- |
| 列表查询 | `GET`    | `/{prefix}/{resource}`             | `form`   |                 |
| 查询详情 | `GET`    | `/{prefix}/{resource}`             | `form`   |                 |
| 添加     | `POST`   | `/{prefix}/{resource}`             | `json`   |                 |
| 修改     | `PUT`    | `/{prefix}/{resource}/{id}`        | `json`   |                 |
| 修订     | `PATCH`  | `/{prefix}/{resource}/{id}`        | `json`   |                 |
| 修改YN   | `PATCH`  | `/{prefix}/{resource}/{id}/yn`     | `form`   | yn=1\|0         |
| 修改状态 | `PATCH`  | `/{prefix}/{resource}/{id}/status` | `form`   | status={status} |
| 删除     | `DELETE` | `/{prefix}/{resource}/{id}`        |          |                 |
|          |          |                                    |          |                 |

> * `prefix`：默认为`api`。

## 关联阅读

* [查询](query)
