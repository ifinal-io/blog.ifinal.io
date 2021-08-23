---
formatterOff: "@formatter:off"
title: TDD-测试驱动开发 
subtitle: tdd 
summary: 测试驱动开发
typed: [Test-Driven Development]
categories: [test] 
tags: [test] 
date: 2021-08-16 13:30:03 +800 
version: 1.0
formatterOn: "@formatter:on"
---

# 测试驱动开发

## What——什么是TDD

TDD 是**测试驱动开发**（`Test-Driven Development`）的简称，是敏捷开发中的一项核心实践和技术，也是一种设计方法论。
TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码。

## Why——为什么要TDD

* 提升代码质量和功能健壮性
* 降级测试成本
* 预防上线风险

## How——如果进行TDD

### Test(目标)

进行测试之前，首先要明确测试的目标，一般为**某一个特定类中的某个特定方法**。

如用户登录，输入正确的用户名和密码时，返回用户信息，否则抛出`UserOrPasswordNotMatchedException`的异常：

```java
public interface UserService {

    /**
     * 用户登录
     *
     * @param name     用户名
     * @param password 密码
     * @return 用户信息
     * @throws UserOrPasswordNotMatchedException 当用户名或密码不匹配时，抛出该异常。
     */
    @NonNull
    User login(@NotBlank String name, @NotBlank String password);

    class UserOrPasswordNotMatchedException extends RuntimeException {
        public UserOrPasswordNotMatchedException() {
            super("用户名或密码不正确");
        }
    }
}
```

### Assertions(断言)

`Assertions`(断言)用于判定目标的某一项指标是否满足测试要求，如：

* 目标方法的返回值是否与期望一致；
* 目标方法是否被调用；
* ……

针对用户登录的场景，可以写出如下断言：

```java
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void should_login_success_when_found_user() {

        final User user = userService.login("user", "password");

        assertNotNull(user);
        assertEquals("user", user.getName());

    }


    @Test
    void should_throw_exception_when_not_found_user() {

        final UserOrPasswordNotMatchedException exception = assertThrows(UserOrPasswordNotMatchedException.class, () -> userService.login("user", "password"));
        assertEquals("用户名或密码不正确", exception.getMessage());

    }
}
```

由于`UserServiceImpl`为空实现，所以现在运行测试都不会通过：

* should_login_success_when_found_user

```shell
org.opentest4j.AssertionFailedError: expected: not <null>
```

* should_throw_exception_when_not_found_user

```shell
org.opentest4j.AssertionFailedError: Expected org.ifinalframework.data.mybatis.dao.mapper.UserService.UserOrPasswordNotMatchedException to be thrown, but nothing was thrown.
```

这个时候，来填写`UserServiceImpl`的实现，其依赖于`UserMapper`：

```java
class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @NonNull
    @Override
    public User login(@NotBlank String name, @NotBlank String password) {

        final User user = userMapper.selectOne(new UserQuery(name, password));

        if (Objects.isNull(user)) {
            throw new UserOrPasswordNotMatchedException();
        }

        return user;

    }
}
```

此时，再次运行测试，`should_throw_exception_when_not_found_user`的提示会变成为：

```shell
org.opentest4j.AssertionFailedError: Unexpected exception type thrown ==> expected: <org.ifinalframework.data.mybatis.dao.mapper.UserService.UserOrPasswordNotMatchedException> but was: <java.lang.NullPointerException>
```

这是因为实现类的依赖对象`UserMapper`并有注入。

### Mock(打桩)

`Mock`（打桩）用于构造测试数据以模拟真实的业务流程，减少在开发阶段对第三方接口（内部或外部）的依赖，使开发者将业务的关注点聚焦于当前测试目标的功能，而非依赖的第三方。

开发者可以使用打桩的方式，模拟各种业务场景，从而提高测试目标的健壮性。

如：
* 构造方法返回值；
* 构造异常；
* ……

在用户登录的例子中，其实现依赖于`UserMapper`，而这个依赖可能还没有实现或是第三方的接口不方便于调试，这个时候，可以使用`Mock`来对这个对象进行打桩，以构造的方式模拟业务流程。

```java
    @Mock
    private UserMapper userMapper;
```

再一次执行测试，发现`should_throw_exception_when_not_found_user`竟然神奇的通过了。这是因为`Mock`对象，对于返回引用类型的方法，默认返回`null`。

对于找不到用户信息的场景，暂且告一段落，如果来模拟能找到用户信息的场景呢？在测试方法中添加如下代码：

```java
    when(userMapper.selectOne(any(IQuery.class))).thenReturn(new User("user", "password"));
```

上述代码的意思是**当`userMaper.selectOne(IQuery)`方法被调用时，返回一个新的`User`实例。

这样就实现了使用`Mock`对象替代三方接口依赖了。

再次运行测试，发现两个测试都通过了。

完整测试代码如下：

```java

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserMapper userMapper;

    @Test
    void should_login_success_when_found_user() {

        when(userMapper.selectOne(any(IQuery.class))).thenReturn(new User("user", "password"));

        final User user = userService.login("user", "password");

        assertNotNull(user);
        assertEquals("user", user.getName());

    }


    @Test
    void should_throw_exception_when_not_found_user() {

        final UserOrPasswordNotMatchedException exception = assertThrows(UserOrPasswordNotMatchedException.class, () -> userService.login("user", "password"));
        assertEquals("用户名或密码不正确", exception.getMessage());

    }
}
```

### ParameterizedTest(参数化测试)

除了使用`@Test`进行单一的用例测试,`JUnit`还提供了对参数化的测试的支持，使用`@ParameterizedTest`注解替代`@Test`，并在测试方法声明参数，然后使用`@ValueSource`指定参数列表即可：

```java
@Slf4j
class ParameterizedTestExampleTest {

    @ParameterizedTest
    @ValueSource(strings = {"hello", "parameterized", "test"})
    void parameterizedTest(String parameter) {
        logger.info(parameter);
    }

}
```

> `@ValueSource`支持**基本类型**和`String`。

### ArgumentCaptor(参数捕获)

`ArgumentCaptor`可用于捕获目标方法内的过程参数，以验证目标方法是否按照预期流程执行和参数是否正确。

```java
    // 实例化一个参数捕获器
    ArgumentCaptor<Person> argument = ArgumentCaptor.forClass(Person.class);
    // 执行目标方法    
    verify(mock).doSomething(argument.capture());
    // 校验捕获的参数    
    assertEquals("John", argument.getValue().getName());
```

## Tools(工具)

### Jacoco

`Jacoco`是一个测试覆盖率报告生成插件，集成该插件可以在项目构建时自动执行测试并生成测试报告，同时可设置测试指标，如果指标未达成，可强制结束构建直到测试指标达标。

* 第一步，在`pom.xml`的`build->plugins`节点下添加以下插件配置：

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <configuration>
        <excludes>
            <exclude>**/*Entity.java</exclude>
            <exclude>**/*Entity.class</exclude>
        </excludes>
    </configuration>
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

* 第二步，执行`test`:

```shell
mvn clean test
```

* 第三步，查看报告文件

在浏览器中打开生成的测试报告，路径为：

```shell
/target/site/jacoco/index.html
```

### Git HooK

`Git Hook`是一种勾子函数，可在执行`git`相关命令时，触发相关脚本的执行，如在`git commit`之前执行测试，以避免将有缺陷的代码提交到仓库中。

在项目根目录下添加`.githook/pre-commit`文件，内容如下：

```shell
#!/bin/sh
#execute shell before commit,check the code

mvn test
#得到检测结果，没有问题 执行结果为0；有问题 执行结果为非0
check_result=$?
if [ $check_result -eq 0 ]
then 
    echo "项目执行Test检测成功!!!"
else    
    echo "提交失败，源于项目存在代码测试问题（mvn test）"
    exit 1
fi
```

## 原则

* **独立测试**：不同代码的测试应该相互独立，一个类对应一个测试类（对于C代码或C++全局函数，则一个文件对应一个测试文件），一个函数对应一个测试函数。用例也应各自独立，每个用例不能使用其他用例的结果数据，结果也不能依赖于用例执行顺序。 一个角色：开发过程包含多种工作，如：编写测试代码、编写产品代码、代码重构等。做不同的工作时，应专注于当前的角色，不要过多考虑其他方面的细节。

* **测试列表**：代码的功能点可能很多，并且需求可能是陆续出现的，任何阶段想添加功能时，应把相关功能点加到测试列表中，然后才能继续手头工作，避免疏漏。

* **测试驱动**：即利用测试来驱动开发，是TDD的核心。要实现某个功能，要编写某个类或某个函数，应首先编写测试代码，明确这个类、这个函数如何使用，如何测试，然后在对其进行设计、编码。

* **先写断言**：编写测试代码时，应该首先编写判断代码功能的断言语句，然后编写必要的辅助语句。

* **可测试性**：产品代码设计、开发时的应尽可能提高可测试性。每个代码单元的功能应该比较单纯，“各家自扫门前雪”，每个类、每个函数应该只做它该做的事，不要弄成大杂烩。尤其是增加新功能时，不要为了图一时之便，随便在原有代码中添加功能，对于C++编程，应多考虑使用子类、继承、重载等OO方法。

* **及时重构**：对结构不合理，重复等“味道”不好的代码，在测试通过后，应及时进行重构。

* **小步前进**：软件开发是复杂性非常高的工作，小步前进是降低复杂性的好办法。