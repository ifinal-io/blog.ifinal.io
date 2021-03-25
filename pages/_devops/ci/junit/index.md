---
formatter: "@formatter:off"
title: 单元测试 
subtitle: index 
summary: index 
tags: [] 
date: 2021-03-19 10:40:54 +800 
version: 1.0
formatter: "@formatter:on"
---

# 单元测试

## What

单元测试是通过一系统的方法测试，采用断言的方式来判断一个个小的单元是否按照预期在工作。

如：

* 方法的返回值是否与期望一至
* 方法的处理过程中是否触发了某一个动作
* 方法的用时是否满足预定的目标
* ……

## Usage

* 第一个测试用例

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import example.util.Calculator;

import org.junit.jupiter.api.Test;

class MyFirstJUnitJupiterTests {

    private final Calculator calculator = new Calculator();

    @Test
    void addition() {
        assertEquals(2, calculator.add(1, 1));
    }

}
```