import { io } from "socket.io-client";

import.meta.env.VITE_API_URL

export const socket = io(
  import.meta.env.VITE_API_URL
);