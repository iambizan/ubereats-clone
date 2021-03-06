import { all } from "@redux-saga/core/effects";

import restaurant from "./restaurant";
import cart from "./cart";

export default function* () {
  yield all([restaurant(), cart()]);
}
