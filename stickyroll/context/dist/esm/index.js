import { createContext } from 'react';

/**
 * @type {IContext}
 */
const DEFAULT_CONTEXT = { page: 0, progress: 0, pages: 0 };
/**
 * @type {Context<IContext>}
 */
const { Consumer: ScrollConsumer, Provider: ScrollProvider } = createContext(DEFAULT_CONTEXT);

export { DEFAULT_CONTEXT, ScrollConsumer, ScrollProvider };
