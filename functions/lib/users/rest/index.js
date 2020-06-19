"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = require("../../utils/routers");
const restRouter = routers_1.default.whitelisted;
const post_1 = require("./post");
restRouter.post('', post_1.post);
exports.default = restRouter;
//# sourceMappingURL=index.js.map