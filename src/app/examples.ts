import { DynamicUrlMatcherRoutes } from "./dynamic-url-matcher/dynamic-url.matcher.routes";

export const examples = [
    {
        name: "Dynamic route URL matcher",
        description: "Possibly infinite number of subroutes, with dynamic route params.",
        path: "matcher",
        routes: DynamicUrlMatcherRoutes,
    }
];
