export interface UseStickyrollOptions {
	pages: number;
	factor?: number;

	onPage?(page: number, index: number): void;
	onProgress?(progress: number, page: number, index: number): void;
	onStart?(): void;
	onEnd?(): void;
}
