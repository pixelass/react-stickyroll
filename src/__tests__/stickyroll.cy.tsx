import { CLASS_NAMES, CSS_VARS } from "../constants";
import StickyRoll from "../stickyroll";

describe("Stickyroll", () => {
	it("should render children", () => {
		cy.viewport(1000, 1000);
		cy.mount(
			<StickyRoll data-cy="stickyroll" pages={1}>
				Test
			</StickyRoll>
		);
		cy.get(`[data-cy="stickyroll"]`).should("contains.text", "Test");
	});

	it("should provide CSS variables", () => {
		cy.viewport(1000, 1000);
		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll data-cy="stickyroll" pages={1}>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.pages, "1");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "-1");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.progress, "-0.2");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.factor, "1");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.height, "calc(2 *  100vh)");
		cy.scrollTo(0, 201);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "0");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.progress, "0.001");
	});

	it("should provide CSS classNames", () => {
		cy.viewport(1000, 1000);
		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll data-cy="stickyroll" pages={1}>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.root);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.nonSticky);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.above);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.page(-1));
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.sticky);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.below);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.page(0));
		cy.scrollTo(0, 201);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.sticky);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.page(0));
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.nonSticky);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.above);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.below);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.page(-1));
		cy.scrollTo(0, 1201);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.nonSticky);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.below);
		cy.get(`[data-cy="stickyroll"]`).should("have.class", CLASS_NAMES.page(0));
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.sticky);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.above);
		cy.get(`[data-cy="stickyroll"]`).should("not.have.class", CLASS_NAMES.page(-1));
	});

	it("should allow changing the factor", () => {
		cy.viewport(1000, 1000);
		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll data-cy="stickyroll" pages={1} factor={4}>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.height, "calc(5 *  100vh)");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.factor, "4");
		cy.scrollTo(0, 201);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "0");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.progress, "0.00025");
		cy.scrollTo(0, 1200);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.progress, "0.25");
	});

	it("should allow changing the pages", () => {
		cy.viewport(1000, 1000);
		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll data-cy="stickyroll" pages={10}>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.height, "calc(11 *  100vh)");
		cy.scrollTo(0, 201);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "0");
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.progress, "0.001");
		cy.scrollTo(0, 1200);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "1");
		cy.scrollTo(0, 2200);
		cy.wait(100);
		cy.get(`[data-cy="stickyroll"]`).should("have.css", CSS_VARS.page, "2");
	});

	it("should work without listeners", () => {
		cy.viewport(1000, 1000);

		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll data-cy="stickyroll" pages={1}>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.scrollTo(0, 200);
		cy.wait(100);
		cy.scrollTo(0, 201);
		cy.wait(100);
		cy.scrollTo(0, 1199);
		cy.wait(100);
		cy.scrollTo(0, 1200);
		cy.wait(100);
		cy.scrollTo(0, 1201);
		cy.wait(100);
		cy.scrollTo(0, 1202);
		cy.wait(100);
		cy.scrollTo(0, 0);
	});

	it("should listen to events", () => {
		cy.viewport(1000, 1000);
		const onStart = cy.spy().as("onStart");
		const onPage = cy.spy().as("onPage");
		const onProgress = cy.spy().as("onProgress");
		const onEnd = cy.spy().as("onEnd");

		cy.mount(
			<>
				<div style={{ height: 200 }} />
				<StickyRoll
					data-cy="stickyroll"
					pages={1}
					onStart={onStart}
					onPage={onPage}
					onProgress={onProgress}
					onEnd={onEnd}
				>
					Test
				</StickyRoll>
				<div style={{ height: 200 }} />
			</>
		);
		cy.scrollTo(0, 200);
		cy.get("@onStart").should("not.have.been.called");
		cy.get("@onProgress").should("not.have.been.called");
		cy.get("@onPage").should("not.have.been.called");
		cy.get("@onEnd").should("not.have.been.called");
		cy.wait(100);
		cy.scrollTo(0, 201);
		cy.get("@onProgress").should("have.been.calledWith", 0.001, 1, 0);
		cy.get("@onPage").should("have.been.calledWith", 1, 0);
		cy.get("@onStart").should("have.been.calledOnce");
		cy.scrollTo(0, 1199);
		cy.wait(100);
		cy.scrollTo(0, 1200);
		cy.wait(100);
		cy.scrollTo(0, 1201);
		cy.wait(100);
		cy.scrollTo(0, 1202);
		cy.get("@onEnd").should("have.been.calledOnce");
		cy.wait(100);
		cy.scrollTo(0, 0);
	});
});
