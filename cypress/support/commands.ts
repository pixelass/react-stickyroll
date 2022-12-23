// React 18
import { mount } from "cypress/react18";
import type { ReactNode } from "react";

// React 16, 17

Cypress.Commands.add("mount", (component: ReactNode, options) =>
	// Wrap any parent components needed
	// ie: return mount(<MyProvider>{component}</MyProvider>, options)
	mount(component, options)
);
