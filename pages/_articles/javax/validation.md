---
formatterOff: "@formatter:off"
title: validation 
subtitle: validation 
summary: validation
categories: [] 
tags: [] 
date: 2021-09-28 16:28:52 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# validation



## Annotations

|     Annotation     |                             规则                             |         |
| :----------------: | :----------------------------------------------------------: | :-----: |
|   `@AssertFalse`   |                  带注释的元素必须为 false。                  | `true`  |
|   `@AssertTrue`    |                    带注释元素必须为true。                    | `true`  |
|   `@DecimalMax`    | 带注释的元素必须是一个数字，其值必须小于或等于指定的最大值。 | `true`  |
|   `@DecimalMin`    | 带注释的元素必须是一个数字，其值必须大于或等于指定的最小值。 | `true`  |
|     `@Digits`      |              注释元素必须是可接受范围内的数字。              | `true`  |
|      `@Email`      |            该字符串必须是格式正确的电子邮件地址。            | `true`  |
|     `@Future`      |          注释元素必须是未来的某个时刻、日期或时间。          | `true`  |
| `@FutureOrPresent` |         注释元素必须是现在或将来的瞬间、日期或时间。         | `true`  |
|       `@Max`       | 带注释的元素必须是一个数字，其值必须小于或等于指定的最大值。 | `true`  |
|       `@Min`       | 带注释的元素必须是一个数字，其值必须小于或等于指定的最大值。 | `true`  |
|    `@Negative`     |     带注释的元素必须是严格的负数（即 0 被视为无效值）。      | `true`  |
| `@NegativeOrZero`  |                 带注释的元素必须是负数或 0。                 | `true`  |
|    `@NotBlank`     |    带注释的元素不能为null并且必须至少包含一个非空白字符。    | `true`  |
|    `@NotEmpty`     |                带注释的元素不得为null或为空。                | `true`  |
|     `@NotNull`     |                  带注释的元素不能为null 。                   | `false` |
|      `@Null`       |                  带注释的元素必须为null 。                   | `true`  |
|      `@Past`       |        带注释的元素必须是过去的某个时刻、日期或时间。        | `true`  |
|  `@PastOrPresent`  |         注释元素必须是过去或现在的瞬间、日期或时间。         | `true`  |
|     `@Pattern`     |        带注释的CharSequence必须匹配指定的正则表达式。        | `true`  |
|    `@Positive`     |       注释元素必须是严格的正数（即 0 被视为无效值）。        | `true`  |
| `@PositiveOrZero`  |                   注释元素必须是正数或 0。                   | `true`  |
|      `@Size`       |        带注释的元素大小必须在指定的边界（包括）之间。        | `true`  |
|                    |                                                              |         |
|                    |                                                              |         |

