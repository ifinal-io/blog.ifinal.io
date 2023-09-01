---
formatterOff: "@formatter:off"
title: Spring Security Remember Me Authentication
subtitle: Spring 参数解析器
summary: 
categories: []
tags: []
date: 2023-03-21 12:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

# RememberMeAuthenticationFilter

## 认证流程

1. 查询是否已登录，如果已登录，则直接继续下一个`Filter`。
```java
if (SecurityContextHolder.getContext().getAuthentication() != null) {
	this.logger.debug(LogMessage
			.of(() -> "SecurityContextHolder not populated with remember-me token, as it already contained: '"
					+ SecurityContextHolder.getContext().getAuthentication() + "'"));
	chain.doFilter(request, response);
	return;
}
```
2. 调用`RememberMeServices.autoLogin()`方法进行自动登录
```java
Authentication rememberMeAuth = this.rememberMeServices.autoLogin(request, response);
```
3. 如果自动登录结果不为`null`，则调用`AuthenticationManager.authenticate()`方法进行认证。
```java
rememberMeAuth = this.authenticationManager.authenticate(rememberMeAuth);
```

