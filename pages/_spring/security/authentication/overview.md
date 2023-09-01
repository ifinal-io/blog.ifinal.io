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

| 认证方式               | `Filter`                               | `Authentication`                      |                                | `AuthenticationProvider`           | `SecurityConfigurer`  |
|--------------------|----------------------------------------|---------------------------------------|--------------------------------|------------------------------------|-----------------------|
| `UsernamePassword` | `UsernamePasswordAuthenticationFilter` | `UsernamePasswordAuthenticationToken` |                                | `DaoAuthenticationProvider`        | `FormLoginConfigurer` |
| `Basic`            | `BasicAuthenticationFilter`            | `UsernamePasswordAuthenticationToken` | `BasicAuthenticationConverter` | `DaoAuthenticationProvider`        | `HttpBasicConfigurer` |
| `Remember Me`      | `RememberMeAuthenticationFilter`       | `RememberMeAuthenticationToken`       | `RememberMeServices`           | `RememberMeAuthenticationProvider` |                       |
|                    |                                        |                                       |                                |                                    |                       |
|                    |                                        |                                       |                                |                                    |                       |
