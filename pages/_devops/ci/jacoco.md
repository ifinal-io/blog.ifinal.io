---
formatter: "@formatter:off"
title: Jacoco 
subtitle: jacoco 
summary: 测试覆盖率生成插件 
tags: [ci,test,junit] 
date: 2021-03-19 10:51:39 +800 
version: 1.0
formatter: "@formatter:on"
---

# Jacoco

## What

**Jacoco**是一个生成测试覆盖率的插件，可以更直观地分析测试的结果。

## Usage

### Maven

* Import Dependency

在工具根目录的`pom.xml`文件中，添加`jacoco-maven-plugin`的插件：

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>${jacoco.version}</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

* 执行测试

通过`mvn test/package/install`等命令执行测试，如：

```shell
mvn test
```

上述命令执行完成之后，可在`target/site/jacoco`自动生成测试报告，用浏览器打开`index.html`文件即可。

![Jacoco](../images/ci/jacoco.png)

