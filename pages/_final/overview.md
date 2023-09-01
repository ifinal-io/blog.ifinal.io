---
formatterOff: "@formatter:off"
title: 概览
subtitle: API接口
summary: API接口
categories: []
tags: []
date: 2022-03-09 13:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

# 概述

一个致力于提供开箱即用的Java后端服务开发脚手架项目。



## 特性

* 简化的[API](features/api)开发方式
* [国际化](features/i18n)

## 依赖

### Maven

* Parent

```xml
<parent>
    <groupId>org.ifinalframework.boot</groupId>
    <artifactId>final-boot-parent</artifactId>
    <version>${latest.release.version}</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

* DependencyManagement

```xml
<dependency>
    <groupId>org.ifinalframework.boot</groupId>
    <artifactId>final-boot-parent</artifactId>
    <version>${latest.release.version}</version>
    <scope>import</scope>
    <type>pom</type>
</dependency>
```

## 核心项目


<table>
  <thead>
    <tr>
      <th>
        仓库
      </th>
      <th>
        Badges
      </th>
    </tr>
  </thead>
  <tbody>
<!-- final-auto -->
    <tr>
      <td>
        <a href="https://github.com/final-projects/final-auto">final-auto</a>
      </td>
      <td class="text-center">
        <img style="display: inline-block;" src="https://github.com/final-projects/final-auto/workflows/ci/badge.svg"/>
        <img style="display: inline-block" src="https://img.shields.io/maven-central/v/org.ifinalframework.auto/final-auto?label=maven&color=success"/>
        <img style="display: inline-block" src="https://img.shields.io/nexus/r/org.ifinalframework.auto/final-auto?server=https://s01.oss.sonatype.org"/>
        <img style="display: inline-block" src="https://img.shields.io/nexus/s/org.ifinalframework.auto/final-auto?server=https://s01.oss.sonatype.org"/>
        <img style="display: inline-block" src="https://img.shields.io/github/stars/final-projects/final-auto"/>
        <img style="display: inline-block" src="https://codecov.io/gh/final-projects/final-auto/branch/main/graph/badge.svg"/>
      </td>
    </tr>
    <!-- final-annotation -->
    <tr>
      <td>
        <a href="https://github.com/final-projects/final-annotation">final-annotation</a>
      </td>
      <td class="text-center">
        <img src="https://github.com/final-projects/final-annotation/workflows/ci/badge.svg"/>
        <img src="https://img.shields.io/maven-central/v/org.ifinalframework.annotation/final-annotation?label=maven&color=success"/>
        <img src="https://img.shields.io/nexus/r/org.ifinalframework.annotation/final-annotation?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/nexus/s/org.ifinalframework.annotation/final-annotation?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/github/stars/final-projects/final-annotation"/>
        <img src="https://codecov.io/gh/final-projects/final-annotation/branch/main/graph/badge.svg"/>
      </td>
    </tr>
    <!-- final-framework -->
    <tr>
      <td>
        <a href="https://github.com/final-projects/final-framework">final-framework</a>
      </td>
      <td class="text-center">
        <img src="https://github.com/final-projects/final-framework/workflows/ci/badge.svg"/>
        <img src="https://img.shields.io/maven-central/v/org.ifinalframework/final-framework?label=maven&color=success"/>
        <img src="https://img.shields.io/nexus/r/org.ifinalframework/final-framework?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/nexus/s/org.ifinalframework/final-framework?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/github/stars/final-projects/final-framework"/>
        <img src="https://codecov.io/gh/final-projects/final-framework/branch/main/graph/badge.svg"/>
      </td>
    </tr>
    <!-- final-data -->
    <tr>
      <td>
        <a href="https://github.com/final-projects/final-data">final-data</a>
      </td>
      <td class="text-center">
        <img src="https://github.com/final-projects/final-data/workflows/ci/badge.svg"/>
        <img src="https://img.shields.io/maven-central/v/org.ifinalframework.data/final-data?label=maven&color=success"/>
        <img src="https://img.shields.io/nexus/r/org.ifinalframework.data/final-data?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/nexus/s/org.ifinalframework.data/final-data?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/github/stars/final-projects/final-data"/>
        <img src="https://codecov.io/gh/final-projects/final-data/branch/main/graph/badge.svg"/>
      </td>
    </tr>
    <!-- final-boot -->
    <tr>
      <td>
        <a href="https://github.com/final-projects/final-boot">final-boot</a>
      </td>
      <td class="text-center">
        <img src="https://github.com/final-projects/final-boot/workflows/ci/badge.svg"/>
        <img src="https://img.shields.io/maven-central/v/org.ifinalframework.boot/final-boot?label=maven&color=success"/>
        <img src="https://img.shields.io/nexus/r/org.ifinalframework.boot/final-boot?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/nexus/s/org.ifinalframework.boot/final-boot?server=https://s01.oss.sonatype.org"/>
        <img src="https://img.shields.io/github/stars/final-projects/final-boot"/>
        <img src="https://codecov.io/gh/final-projects/final-boot/branch/main/graph/badge.svg"/>
      </td>
    </tr>
  </tbody>
</table>

> 请`Star`上述项目，谢谢🙏


