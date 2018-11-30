'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * @type {IContext}
 */
const DEFAULT_CONTEXT = { page: 0, progress: 0, pages: 0 };
/**
 * @type {Context<IContext>}
 */
const { Consumer: ScrollConsumer, Provider: ScrollProvider } = react.createContext(DEFAULT_CONTEXT);

exports.DEFAULT_CONTEXT = DEFAULT_CONTEXT;
exports.ScrollConsumer = ScrollConsumer;
exports.ScrollProvider = ScrollProvider;
