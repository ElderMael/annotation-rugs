# add-annotation-to-type

[![Build Status](https://travis-ci.org/atomist-contrib/add-annotation-to-type.svg?branch=master)](https://travis-ci.org/atomist-contrib/add-annotation-to-type)

[rug]: http://docs.atomist.com/

This [Rug][rug] project contains an Atomist Rug archive project

## Rugs

### AddAnnotationToEveryTypeInPackage

a rug that adds an annotation to every Java type in a package

#### Parameters

This Rug takes following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`packageOfTypesToAnnotate` | Yes | | com.example.dtos
`annotationPackage` | Yes | | lombok
`annotationName` | Yes | | Builder

#### Running

Run this Rug as follows:

```
$ rug edit "eldermael:add-annotation-to-type:AddAnnotationToEveryTypeInPackage" -a 0.1.0 packageOfTypesToAnnotate=com.example annotationPackage=lombok annotationName=Builder
```

It adds an annotation type to every type in the package you specify
