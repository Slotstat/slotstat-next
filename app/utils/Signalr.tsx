"use client";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import useStore from "../(store)/store";

// In production the browser talks to the hub directly. Going through the
// /api/events rewrite cannot carry WebSockets, so SignalR fell back to long
// polling and every poll was a billed Vercel request. The backend's CORS
// allows https://slotstat.net with credentials. Local dev keeps the rewrite
// because localhost is not an allowed origin.
const HUB_URL =
  process.env.NODE_ENV === "production" ? "https://api.slotstat.net/events" : "/api/events";

const signalR = async () => {
  const connection = new HubConnectionBuilder()
    .withUrl(HUB_URL)
    .configureLogging(LogLevel.Information)
    .build();

  async function start() {
    try {
      await connection.start();
      useStore.setState({ isOn: true });

      connection.on("newRate", (message) => {
        useStore.setState({ newRate: message });
      });
      connection.on("newjackpot", (message) => {
        useStore.setState({ newJackpot: message });
      });
      connection.on("jackpothasbeendrawn", (message) => {
        useStore.setState({ jackpotHasBeenDrawn: message });
      });
      connection.on("newRtp", (message) => {
        useStore.setState({ newRtp: message });
      });
      connection.on("newUser", (message) => {
        useStore.setState({ newUser: message });
      });
      connection.on("newwsr", () => {});
    } catch (err) {
      setTimeout(start, 5000);
    }
  }

  connection.onclose(async () => {
    await start();
  });

  const stop = () => {
    connection.stop();
  };

  // Start the connection.
  start();
};

export default signalR;
