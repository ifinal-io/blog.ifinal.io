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

## Rest Api

Final内置了大量通用的CRUD接口，方便开发者快速实现服务接口开发。

| 操作   | 方法       | RequestUri                         | 参数格式   |                   参数                   |
|------|----------|------------------------------------|--------|:--------------------------------------:|
| 列表查询 | `GET`    | `/{prefix}/{resource}`             | `form` |  `{Entity}ListQuery`\|`{Entity}Query`  |
| 查询详情 | `GET`    | `/{prefix}/{resource}/detail`      | `form` | `{Entity}DetailQuery`\|`{Entity}Query` |
| 查询详情 | `GET`    | `/{prefix}/{resource}/{id}`        | `form` |                                        |
| 添加   | `POST`   | `/{prefix}/{resource}`             | `json` |                                        |
| 修改   | `PUT`    | `/{prefix}/{resource}/{id}`        | `json` |                                        |
| 修订   | `PATCH`  | `/{prefix}/{resource}/{id}`        | `json` |                                        |
| 修改YN | `PATCH`  | `/{prefix}/{resource}/{id}/yn`     | `form` |                yn=1\|0                 |
| 修改状态 | `PATCH`  | `/{prefix}/{resource}/{id}/status` | `form` |            status={status}             |
| 删除   | `DELETE` | `/{prefix}/{resource}/{id}`        |        |                                        |
| 批量删除 | `DELETE` | `/{prefix}/{resource}`             | `json` |         `{Entity}DeleteQuery`          |
|      |          |                                    |        |                                        |

> * `prefix`：默认为`api`。

