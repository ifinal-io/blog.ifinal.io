---
formatterOff: "@formatter:off"
title: 参数解析器
subtitle: argument-resolver 
summary: argument-resolver
categories: [] 
tags: [] 
date: 2022-03-05 19:47:31 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# argument-resolver

在一般的业务场景下，Spring 内置的参数解析已经可以满足绝大多数的业务场景了。对于一些复杂的请求，开发者也可以在接收到请求参数后再自行解析。



## @RequestJsonParam

使用`@RequestJsonParam`接收`key=json`的表单参数。

1. 定义Json对象和Controller

```java
@RestController
public class JsonParamController{
    @GetMapping("/json")
    public void json(@RequestJsonParam User user){
        // do something
    }
}

public class User{
    private String name;
    private Integer age;
    
    // setter and getter
}
```

2. 访问接口

```shell
curl http://localhost:8080/json?user={"user":"xiaoMing","age":18}
```

## @RequestExcelPart(开发中)

使用`@RequestExcelPart`注解接收Excel文件，支持`Stream<T>`和`List<T>`。

```java
@RestController
public class ExcelController{
    @PostMapping("/excel")
    pulbic void excel(@RequestExcelPart List<User> users){
        // do something...
    }
}
```