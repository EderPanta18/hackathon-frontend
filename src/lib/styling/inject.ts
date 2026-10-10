// src/lib/styling/inject.ts

import {
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from "react";
import { cn } from "./cn";

export function injectClassName(node: ReactNode, className: string): ReactNode {
    if (!isValidElement<{ className?: string }>(node)) return node;

    return cloneElement(node as ReactElement<{ className?: string }>, {
        className: cn(className, node.props.className),
    });
}
