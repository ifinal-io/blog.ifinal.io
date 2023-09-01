---
formatter: "@formatter:off"
title: "Spring Validation"
subtitle: 
summary: 校验
tags: [spring,validation] 
date: 2023-03-20 09:50:48 +800 
version: 1.0
formatter: "@formatter:on"
---

# Validation

在Spring中，可以通过在方法或参数上添加`@Validated`和`@Valid`注解及配合众多`@Constraint`来实现对参数的校验。

先说结论：

* 如果参数需要值校验，则需要在方法上声明`@Validated`
  注解同时在参数上声明需要校验的规则。如`@NotNull String name`、`@NotEmpty List<String> list`。
* 如果参数需要嵌套校验，则需要在对应的参数上声明`@Valid`注解。
* 如果需要分组校验，则需要（在方法或参数上）声明`@Validated`或在JavaBean中声明`@GroupSequenceProvider`。

> 从Spring Boot 2.3.0开始，需要显示添加以下依赖：
> ```xml
> <dependency>
>     <groupId>org.springframework.boot</groupId>
>     <artifactId>spring-boot-starter-validation</artifactId>
> </dependency>
> ```

## 校验时机

### 参数校验

**参数校验**指的是对每一个参数进行一对一的校验，参数之间互不影响。

在Spring中，一个参数（Controller方法中的参数）能否被校验，取决于该参数是否有满足校验的注解：

* 注解的名称是否等于`javax.validation.Valid`；
* 注解上是否有`@Validated`元注解
* 注解名称是否以`Valid`开头

上述条件的解析源码如下：

```java
public abstract class ValidationAnnotationUtils {

    private static final Object[] EMPTY_OBJECT_ARRAY = new Object[0];

    @Nullable
    public static Object[] determineValidationHints(Annotation ann) {
        Class<? extends Annotation> annotationType = ann.annotationType();
        String annotationName = annotationType.getName();
        // 1、 注解是否为 javax.validation.Valid
        if ("javax.validation.Valid".equals(annotationName)) {
            return EMPTY_OBJECT_ARRAY;
        }
        Validated validatedAnn = AnnotationUtils.getAnnotation(ann, Validated.class);
        if (validatedAnn != null) {
            // 2、如果注解被 @Validated 标记
            Object hints = validatedAnn.value();
            return convertValidationHints(hints);
        }
        if (annotationType.getSimpleName().startsWith("Valid")) {
            // 3、 如果注解名称以 Valid 开头
            Object hints = AnnotationUtils.getValue(ann);
            return convertValidationHints(hints);
        }
        return null;
    }

    private static Object[] convertValidationHints(@Nullable Object hints) {
        if (hints == null) {
            return EMPTY_OBJECT_ARRAY;
        }
        return (hints instanceof Object[] ? (Object[]) hints : new Object[]{hints});
    }

}
```

上述方法被调用的地方：

* `org.springframework.web.method.annotation.ModelAttributeMethodProcessor#validateIfApplicable`
* `org.springframework.web.method.annotation.ModelAttributeMethodProcessor#validateValueIfApplicable`
* `org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodArgumentResolver#validateIfApplicable`
* `org.springframework.web.reactive.result.method.annotation.AbstractMessageReaderArgumentResolver#extractValidationHints`
* `org.springframework.web.reactive.result.method.annotation.ModelAttributeMethodArgumentResolver#validateIfApplicable`

### 方法校验

**方法校验**也叫**切面校验**，Spring中通过AOP方式在方法被调用之前对参数进行（整体）校验。

一个（Spring Bean对象的）方法是否能被校验，取决于这个类有没有声明`@Validated`注解。

该切面由`MethodValidationPostProcessor`及其子类`FilteredMethodValidationPostProcessor`实现：

```java
package org.springframework.validation.beanvalidation;

@SuppressWarnings("serial")
public class MethodValidationPostProcessor extends AbstractBeanFactoryAwareAdvisingPostProcessor
        implements InitializingBean {

    private Class<? extends Annotation> validatedAnnotationType = Validated.class;

    @Override
    public void afterPropertiesSet() {
        // 配置切面为被 Validated 标记
        Pointcut pointcut = new AnnotationMatchingPointcut(this.validatedAnnotationType, true);
        this.advisor = new DefaultPointcutAdvisor(pointcut, createMethodValidationAdvice(this.validator));
    }

    protected Advice createMethodValidationAdvice(@Nullable Validator validator) {
        return (validator != null ? new MethodValidationInterceptor(validator) : new MethodValidationInterceptor());
    }

}
```

* **方法**上有`@Validated`注解
* **类**上有`@Validated`注解

## 分组校验

* **静态分组**：使用Spring提供的`@Validated`注解或实现Hibernate提供的提供的`@GroupSequence`注解。
* **动态分组**：实现Hibernate提供的`@GroupSequenceProvider`注解。

### @Validated

通常来说，通过指定`@Validated`注解的`value()`
，就可以实现分组校验，但这种方式只适用于静态分组，对于动态分组，则需要使用`@GroupSequenceProvider`。

#### 参数分组

* 如果注解是`javax.validation.Valid`，分组为空。
* 如果注解是`@Validated`，分组为`value()`指定的值。
* 如果注解名称以`Valid`开头，分组为`value()`指定的值。

```java

@RestController
@RequestMapping("/validated-group")
public class ValidatedGroupController {

    @GetMapping("/a")
    public Group a(@Validated(GroupA.class) Group group) {
        return group;
    }

    @GetMapping("/b")
    public Group b(@Validated(GroupB.class) Group group) {
        return group;
    }


    public static class Group {
        @NotNull(groups = {GroupA.class})
        private String a;
        @NotNull(groups = {GroupB.class})
        private String b;
    }

    public interface GroupA {
    }

    public interface GroupB {
    }
}
```

参数分组的解析源码如下：

```java
public abstract class ValidationAnnotationUtils {

    private static final Object[] EMPTY_OBJECT_ARRAY = new Object[0];

    @Nullable
    public static Object[] determineValidationHints(Annotation ann) {
        Class<? extends Annotation> annotationType = ann.annotationType();
        String annotationName = annotationType.getName();
        // 1、 注解是否为 javax.validation.Valid
        if ("javax.validation.Valid".equals(annotationName)) {
            return EMPTY_OBJECT_ARRAY;
        }
        Validated validatedAnn = AnnotationUtils.getAnnotation(ann, Validated.class);
        if (validatedAnn != null) {
            // 2、如果注解被 @Validated 标记
            Object hints = validatedAnn.value();
            return convertValidationHints(hints);
        }
        if (annotationType.getSimpleName().startsWith("Valid")) {
            // 3、 如果注解名称以 Valid 开头
            Object hints = AnnotationUtils.getValue(ann);
            return convertValidationHints(hints);
        }
        return null;
    }

    private static Object[] convertValidationHints(@Nullable Object hints) {
        if (hints == null) {
            return EMPTY_OBJECT_ARRAY;
        }
        return (hints instanceof Object[] ? (Object[]) hints : new Object[]{hints});
    }

}
```

#### 方法分组

优先取声明在方法上`@Validated`注解指定的分组，其次取声明在类上的`@Validated`注解指定的分组。

```java

@Validated
@RestController
@RequestMapping("/validated-group")
public class ValidatedGroupController {

    @Validated(GroupA.class)
    @GetMapping("/a")
    public Group a(@Valid Group group) {
        return group;
    }

    @Validated(GroupB.class)
    @GetMapping("/b")
    public Group b(@Valid Group group) {
        return group;
    }


    public static class Group {
        @NotNull(groups = {GroupA.class})
        private String a;
        @NotNull(groups = {GroupB.class})
        private String b;
    }

    public interface GroupA {
    }

    public interface GroupB {
    }
}
```

方法分组的解析源码如下：

```java
public class MethodValidationInterceptor implements MethodInterceptor {
    ...

    protected Class<?>[] determineValidationGroups(MethodInvocation invocation) {
        // 1. 查找方法上声明的 @Validated 注解
        Validated validatedAnn = AnnotationUtils.findAnnotation(invocation.getMethod(), Validated.class);
        if (validatedAnn == null) {
            Object target = invocation.getThis();
            Assert.state(target != null, "Target must not be null");
            // 2. 查找类上声明的 @Validated 注解
            validatedAnn = AnnotationUtils.findAnnotation(target.getClass(), Validated.class);
        }
        // 返回注解中声明的分组或返回空数组。
        return (validatedAnn != null ? validatedAnn.value() : new Class<?>[0]);
    }
    ...
}
```

### @GroupSequence

除了Spring提供的`@Validated`注解之外，还可以使用Hibernate提供的`@GroupSequence`来指定分组序列。

```java

@RestController
@RequestMapping("/group-sequence")
public class ValidatedGroupController {

    @GetMapping
    public Group sequence(@Valid Group group) {
        return group;
    }

    @GroupSequence({GroupA.class, GroupB.class})
    public static class Group {
        @NotNull(groups = {GroupA.class})
        private String a;
        @NotNull(groups = {GroupB.class})
        private String b;
    }

    public interface GroupA {
    }

    public interface GroupB {
    }
}
```

### @GroupSequenceProvider

通过`@GroupSequence`虽然可以来指定分组序列，但这种指定方式是**静态的**、**单一的**、**不可修改的**，当需要根据参数中的某个属性来动态指定分组序列时，
可以使用`@GroupSequenceProvider`注解，并指定一个实现了`DefaultGroupSequenceProvider`接口的分组序列提供者。

```java
@RestController
@RequestMapping("/group-sequence-provider")
public class ValidatedGroupController {

    @GetMapping
    public Group sequence(@Valid Group group) {
        return group;
    }

    @GroupSequenceProvider(MyDefaultGroupSequenceProvider.class)
    public static class Group {
        @NotNull
        private String group;
        @NotNull(groups = {GroupA.class})
        private String a;
        @NotNull(groups = {GroupB.class})
        private String b;
    }

    public interface GroupA {
    }

    public interface GroupB {
    }

    public static class MyDefaultGroupSequenceProvider implements DefaultGroupSequenceProvider<Group> {
        public List<Class<?>> getValidationGroups(Group object) {
            List<Class<?>> list = new ArrayList();
            list.add(Group.class);
            if (Objects.nonNull(object)) {
                if ("A".equals(object.group)) {
                    list.add(GroupA.class);
                } else if ("B".equals(object.group)) {
                    list.add(GroupB.class);
                }
            }

            return list;
        }
    }
}
```

> DefaultGroupSequenceProvider 的实现要注意以下几点：
> * 入参`object`可能为`null`；
> * 不能返回`null`；
> * 必须返回被校验类本身，如`Group.class`；
> * 不能返回`Default.class`；

## 思考

### 如何共用`DefaultGroupSequenceProvider`？

当多个被校验类使用同一个`DefaultGroupSequenceProvider`时，如果来获取被校验类本身呢？

首先，由于入参`object`可能为`null`，所以不能通过`object.getClass()`来获取被校验类本身。
其次，在`object == null`时，虽然可以返回所有的被校验类，从而来达到返回了被校验类本身的目的，但是这样会返回无用的分组，且每增加一个被校验类时，都需要来修改该方法。

1. 对被校验类抽取一个抽象类，该抽象类实现`DefaultGroupSequenceProvider`接口;
2. 被校验类都继承自该抽象类， 并在`@GroupSequenceProvider`注解中指向自身（间接实现了`DefaultGroupSequenceProvider`接口）;
3. 在抽象类方法实现中通过`this.getClass()`来获取到当前类。

### 如何实现一个全局的分组校验？

可以参考Spring 的方法校验，基于AOP实现一个切面，切面中通过获取当前用户的角色或国家地区，来指定属于当前用户的特定分组规则。

1. 自定义一个`MethodValidationInterceptor`并重写`determineValidationGroups`方法来实现指定全局的分组规则。
2. 自定义`FilteredMethodValidationPostProcessor`，并重写`createMethodValidationAdvice`方法，刚刚定义的`MethodValidationInterceptor`。
3. 将自定义的`FilteredMethodValidationPostProcessor`注入到Spring容器中。

