---
formatterOff: "@formatter:off"
title: ExceptionHandler
subtitle: Spring Mvc 异常处理机制。
summary: API接口
categories: []
tags: []
date: 2023-03-07 13:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

# Spring Mvc 异常处理机制

## Usage

### 直接使用

在`Controller`的内容场景一个能够处理异常的方法，并在方法上添加`@ExceptionHandler`。

* 示例1：

```java
@RestController
@RequestMapping("/api/ex-handler")
public class ExceptionHandlerController {

    @GetMapping
    @ResponseIgnore
    public String index(Integer code) throws NullPointerException {
        if (Objects.isNull(code)) {
            throw new NullPointerException("code is null!");
        }
        if (code == 0) {
            throw new IllegalArgumentException("code is zero!");
        }
        return "code is " + code;
    }

    @ResponseIgnore
    @ExceptionHandler(NullPointerException.class)
    public String handle(NullPointerException ex) {
        return "from ex handler:" + ex.getMessage();
    }
}
```
如示例1所示，当访问`/api/ex-handler`时，输出如下：

```text
from ex handler:code is null!
```

### 配合`@ControllerAdvice`使用

在示例1的基础上，添加能够处理另一种异常`IllegalArgumentException`的Advice异常处理类。

* 示例2

```java
@RestControllerAdvice
public class ExceptionHandlerAdvice {
    @ResponseIgnore
    @ExceptionHandler(IllegalArgumentException.class)
    public String handle(IllegalArgumentException ex) {
        return "from ex advice:" + ex.getMessage();
    }
}
```

如示例2所示，当访问`/api/ex-handler?code=0`时，输出如下：

```text
from ex advice:code is zero!
```