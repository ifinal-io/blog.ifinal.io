---
formatterOff: "@formatter:off"
title: Final Web
subtitle: API接口
summary: API接口
categories: [] 
tags: [] 
date: 2022-03-09 13:30:18 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# Final Web

## 引入依赖

```xml
<dependency>
    <groupId>org.ifinalframework.boot</groupId>
    <artifactId>final-boot-starter-web</artifactId>
    <version>${latest.release.version}</version>
</dependency>
```

> 注意：请将 `${latest.release.version}` 更改为实际的版本号。

## 用法

### Rest Api

首先，定义如下的RestController

```java
@SpringBootApplication
@RestController
public class DemoApplication {

	@GetMapping("/hello")
	public String hello() {
		return "hello world!";
    }
}
```

访问`/hello`

```shell
curl http://localhost:8080/hello
```

将看到如下的结果：

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

> 注意：接口返回的数据由框架封装为统一的结果对象返回，开发者只需要返回核心业务数据。

### RequestJsonParam

```java
@SpringBootApplication
@RestController
public class JsonParamApplication{
    
    @GetMapping("/jsonParam")
    public List<Integer> jsonParam(@RequestJsonParam List<Integer> list){
        return list;
    }
}
```

```shell
curl http://localhost:8080/jsonParam?list=[1,2,3]
```