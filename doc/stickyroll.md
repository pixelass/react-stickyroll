---
displayName: "Stickyroll"
description: "Detailed API documentation of the Stickyroll component"
tags:
    - Reference
options:
    order: 0
---

# Stickyroll

## Install

```bash
yarn add @stickyroll/stickyroll
```

## Import

```js
import {Stickyroll} from "@stickyroll/stickyroll";
```

## Types

`Stickyroll` is an alias of `Frame`. They therefore use the same types.

**Properties**

```typescript
/**
 * @typedef {object} IFrameProps
 * @extends {IFrameDefaultProps}
 * @property {string} [anchors]
 * @property {TChild} [children]
 * @property {string} [className]
 * @property {number} [factor]
 * @property {TPageHandler} [onPage]
 * @property {number|Array<any>} pages
 * @property {TRenderer} [render]
 * @property {number} [throttle]
 */
export interface IFrameProps {
	anchors?: string;
	children?: TChild;
	className?: string;
	factor?: number;
	onEnd?: TProgressHandler | TAsyncProgressHandler;
	onPage?: TPageHandler | TAsyncPageHandler;
	onStart?: TProgressHandler | TAsyncProgressHandler;
	pages: number | Array<any>;
	render?: TRenderer;
	throttle?: number;
}
```

**Declarations**

```typescript
import {IContext} from "@stickyroll/context";
/**
 * @typedef {function} TRender<T>
 * @param {IContext} context
 * @returns {T}
 */
export declare type TRender<T> = (context: IContext) => T;
/**
 * @typedef {TRender<any>} TRenderer
 * @param {IContext} context
 * @returns {any}
 */
export declare type TRenderer = TRender<any>;
/**
 * @typedef {TRender<any>} TChild
 * @param {IContext} context
 * @returns {any}
 */
export declare type TChild = TRender<any>;
/**
 * @typedef {function} TPageHandler
 * @param {number} page
 * @returns {void}
 */
export declare type TPageHandler = (page: number) => void;
/**
 * @typedef {function} TAsyncPageHandler
 * @param {number} page
 * @returns {Promise<void>}
 */
export declare type TAsyncPageHandler = (page: number) => Promise<void>;
/**
 * @typedef {function} TProgressHandler
 * @returns {void}
 */
export declare type TProgressHandler = () => void;
/**
 * @typedef {function} TAsyncProgressHandler
 * @returns {Promise<void>}
 */
export declare type TAsyncProgressHandler = () => Promise<void>;
/**
 * @typedef {object} IFrameDefaultProps
 * @property {number} factor
 */
export interface IFrameDefaultProps {
	factor: number;
}
```
