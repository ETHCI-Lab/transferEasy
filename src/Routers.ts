import {Route} from "./interfaces/Route";
import { DocumentRoute } from "./routers/documentRoute";

import { PageRoute } from "./routers/pageRoute";

export const router: Array<Route> = [
    new PageRoute(),new DocumentRoute()
];

