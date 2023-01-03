import { AptosClient } from "aptos";

import { NODE_URL } from "./constants";

export const client = new AptosClient(NODE_URL);
