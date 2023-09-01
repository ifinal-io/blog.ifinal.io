---
formatterOff: "@formatter:off"
title: Spring HandlerMethodArgumentResolver
subtitle: Spring 参数解析器
summary: 
categories: []
tags: []
date: 2023-03-21 10:30:18 +800
version: 1.0
formatterOn: "@formatter:on"
---

# HandlerMethodArgumentResolver

```java
package org.springframework.web.method.support;

public interface HandlerMethodArgumentResolver {

	boolean supportsParameter(MethodParameter parameter);

	@Nullable
	Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception;

}
```


| `parameterType` |   `@Annotation`   |     `HandlerMethodArgumentResolver`      | `功能` |
|:---------------:|:-----------------:|:----------------------------------------:|:----:|
|      `Map`      |      `NONE`       |           `MapMethodProcessor`           |      |
|     `Model`     |         -         |          `ModelMethodProcessor`          |      |
|     `<Any>`     |  `@RequestBody`   |   `RequestResponseBodyMethodProcessor`   |      |
|       ``        | `@ModelAttribute` |     `ModelAttributeMethodProcessor`      |      |
|     `!Map`      | `@RequestHeader`  |  `RequestHeaderMethodArgumentResolver`   |      |
|      `Map`      | `@RequestHeader`  | `RequestHeaderMapMethodArgumentResolver` |      |
|       ``        |                   |                                          |      |
|       ``        |                   |                                          |      |
|       ``        |                   |                                          |      |
|       ``        |                   |                                          |      |
|       ``        |                   |                                          |      |


## @PathVariable

### PathVariableMapMethodArgumentResolver

* 参数上有`@PathVariable`注解且`value()`为空。
* 参数类型是`Map`

```java
package org.springframework.web.servlet.mvc.method.annotation;

public class PathVariableMapMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		PathVariable ann = parameter.getParameterAnnotation(PathVariable.class);
		return (ann != null && Map.class.isAssignableFrom(parameter.getParameterType()) &&
				!StringUtils.hasText(ann.value()));
	}

	/**
	 * Return a Map with all URI template variables or an empty map.
	 */
	@Override
	public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {

		@SuppressWarnings("unchecked")
		Map<String, String> uriTemplateVars =
				(Map<String, String>) webRequest.getAttribute(
						HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE, RequestAttributes.SCOPE_REQUEST);

		if (!CollectionUtils.isEmpty(uriTemplateVars)) {
			return new LinkedHashMap<>(uriTemplateVars);
		}
		else {
			return Collections.emptyMap();
		}
	}

}
```
