---
formatter: "@formatter:off"
title: '@ParameterizedTest'
subtitle: parameterized-tests 
summary: 使用不同的参数测试同一个方法。
tags: [] 
date: 2021-03-19 20:47:35 +800 
version: 1.0
formatter: "@formatter:on"
---

# Parameterized Tests

## What

参数化测试使得一个测试用例能够使用不同的测试参数成为可能。

## Usage

要使得一个测试用例支持参数化测试，除了需要在测试方法中声明测试参数，还需要在方法上声明`@ParameterizedTest`注解并指定一个或多个参数源(Source)。

```java
package org.ifinal.finalframework.junit;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@Slf4j
class ParameterizedTestExampleTest {

    @ParameterizedTest
    @ValueSource(strings = {"hello", "parameterized", "test"})
    void parameterizedTest(String parameter) {
        logger.info(parameter);
    }

}
```

### MethodSource

对一些复合对象参数，不能直接通过注解的方法来提供动态的测试参数，但是可以通过指定一个方法，用方法的返回值来作为方法的测试参数。
`@MethodSource`注解可以指定一个静态方法来为目标测试方法提供测试参数，格式为**全类名#方法名**。

