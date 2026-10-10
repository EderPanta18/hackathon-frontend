// src/ui/feedback/alert/index.ts

import { AlertAction, AlertDescription, Alert as AlertRoot, AlertTitle } from "./Alert";

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
});

export type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from "./alert.types";
