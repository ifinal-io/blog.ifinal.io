---
formatterOff: "@formatter:off"
title: Final Json
subtitle: final-json 
summary: final-json
categories: [] 
tags: [] 
date: 2021-09-26 15:10:49 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# Final Json


## 增强

Final Json 对日期类型和枚举类型进行序列化增强，增加可读性。

### 日期

实体中的日期类型，如`Date`和`LocalDateTime`，在Json序列化时，其值序列化为**时间戳**，同时增加格式为`yyyy-MM-dd HH:mm:ss`的`xxxFormat`的扩展属性。

* 实体

```java
@Data
public class DateBean {

    private Date date;

    private LocalDateTime localDateTime;

}
```

* Json

```json
{
  "date": 1605059845585,
  "dateFormat": "2020-11-11 09:57:25",
  "localDateTime": 1605059845603,
  "localDateTimeFormat": "2020-11-11 09:57:25"
}
```



### 枚举

对于实体类中的枚举属性，在Json序列化时，增加`xxxName`扩展属性，如果枚举实现了`IEnum`接口，用会增加`xxxDesc`扩展属性，同时属性值使用`IEnum#getCode()`值进行序列化。

* 实体

```java
@Data
static class EnumBean {
    private YN yn = YN.YES;
}
```

* Json

```json
{
  "yn": 1,
  "ynName": "YES",
  "ynDesc": "有效"
}
```
