export * from "@stickyroll/context";
export * from "@stickyroll/frame";
export {ScrollConsumer as Listener} from "@stickyroll/context";
import {Frame, IFrameProps } from "@stickyroll/frame";

export interface IStickyrollProps extends IFrameProps{}

export type StickyrollProps = IStickyrollProps;

export class Stickyroll<StickyrollProps> extends Frame {}
