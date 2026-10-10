// src/ui/navigation/tabs/index.ts

import { TabsContent, TabsList, Tabs as TabsRoot, TabsTrigger } from "./Tabs";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "./tabs.types";
