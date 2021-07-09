import { Page } from "./Page";

// Only necessary information about what a link contains.
export interface Snippet {
    displayName: string;
    url: string;
    type: Page;
    altName: string;
}
