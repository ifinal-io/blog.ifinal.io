---
formatterOff: "@formatter:off"
title: Cache
subtitle: final-annotation-cache 
summary: final-annotation-cache
categories: []
tags: [] 
date: 2021-09-27 13:59:42 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# Cache

Final 提供了一系统的注解来简化开发者开发缓存的功能。

首先，先来看一段缓存的模板代码：

* 缓存模板代码 UserService

```java
public class UserService{
    
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    
    @Resource
    private UserMapper userMapper;
    
    User findById(Long id){
        final User cache = stringRedisTemplate.opsForValue().get("user:" + id);
        
        if(Objects.nonNull(cache)) return cache;
        
        final User user = userMapper.findById(id);
        
        if(Objects.nonNull(user)){
            stringRedisTemplate.opsForValue().set("user:"+id,user);
        }
        
        return user;        
    }
}
```

在这段代码中，真正有业务意义的代码只有`final User user = userMapper.findById(id)`这行代码，其它代码均是为了提供该方法的响应性能而做的缓存，而且，类似这样的代码可能大量存在你的项目中。

现在，我们来看一看使用声明式缓存来简化这段代码后的样子吧。

* 声明式缓存代码  UserService

```java
public clas UserService{
    @Resource
    private UserMapper userMapper;
    
    @Cacheable(key="user:#{#id}")
    public User findById(Long id){
        return userMapper.findById(id);
    }
}
```