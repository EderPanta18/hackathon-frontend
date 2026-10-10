import { Children, Fragment, isValidElement, type ReactNode } from "react";

export function countRenderChildren(children: ReactNode, fallbackCount = 0): number {
  if (isValidElement(children) && children.type === Fragment) {
    const inner = (children.props as { children?: ReactNode }).children;
    return Children.count(inner) || fallbackCount;
  }
  return Children.count(children) || fallbackCount;
}
