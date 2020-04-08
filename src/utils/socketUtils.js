import * as SockJS from "sockjs-client";
import AppConfig from "./constants";

export function createSocket() {
  var socket = new SockJS(AppConfig.socketUrl);
  return socket;
}
