"ise client";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import useStore from "../(store)/store";
import { baseUrl } from "@/lib/baseURL";

const signalR = async () => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/events`)
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
        // console.log("newUser", message);
        useStore.setState({ newUser: message });
      });
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
