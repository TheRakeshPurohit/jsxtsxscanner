# JSxTSxScanner

Scans similar block of code in your JS, JSX, TS & TSX files. Requires Node.js
6.0+. It supports ES6 & JSX

[![Build Status](https://travis-ci.org/TheRakeshPurohit/jsxtsxscanner.svg?branch=main)](https://travis-ci.org/TheRakeshPurohit/jsxtsxscanner)

* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)

## Overview

While Working on a project, we might have done copy pasting the code or may be unknowingly repeating the same structural code in our project. Here

It might be a block of code or may be single lines of codes being repeated cross the files.

This package is inspired by true post-production bug. It leads us to the unique, well structured code with nonrepetitive LOC or blocks.

Here we have used ASTs. AST stands for Abstract Syntax Tree. Each compiler or parser generates your source code into ASTs before , e.g. BlockStatement, VariableDeclaration,
ObjectExpression, etc. By default, it searches nodes with matching identifiers
and literals for copy-paste code of block.

The tool accepts a list of paths to parse and prints any found matches. Any
directories among the paths are walked recursively, and only `.js`, `.jsx`, `.ts` , `.tsx`
files are analyzed. Any `node_modules` folders are also
ignored.

## Installation

It can be installed via `npm` using:

``` bash
npm install -g jsxtsxscanner
```

## Usage

``` bash
jsxtsxscanner <paths ...>
```

Scans similar block of code in your JS, JSX, TS & TSX files
Example use: jsxtsxscanner ./path/to/src
