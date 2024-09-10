import { ChatMessage } from "@/app/components/ChatBot/ChatFloatingContainer";

import axios from "axios";
import { OptionsType } from "cookies-next/lib/types";

// export async function getThread(
//   threadId: string | undefined,
//   setThreadId?: React.Dispatch<
//     React.SetStateAction<string | undefined>
//   >
// ) {
//   if (!threadId) return;
//   try {
//     const response = await axios.get(
//       `https://api.openai.com/v1/threads/${threadId}`,

//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: bearer,
//           "OpenAI-Beta": "assistants=v2",
//         },
//       }
//     );
//     setThreadId && setThreadId(response.data.id);
//     // console.log("get thread data", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function createThread(
  setThreadId: React.Dispatch<React.SetStateAction<string | undefined>>,
  setCookie: (name: string, value: string) => void
) {
  try {
    const response = await axios.post("/api/chat/thread", {});

    const data = await response;
    setThreadId(data.data.data.id);
    setCookie("threadId", data.data.data.id);
    return data.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteThread(
  threadId: string | undefined,
  deleteCookie: (key: string, options?: OptionsType | undefined) => void,
  setThreadId?: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (!threadId) return;

  try {
    const response = await axios.delete(`/api/chat/thread?threadId=${threadId}`);

    deleteCookie("threadId");
    setThreadId && setThreadId(undefined);
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export async function postSaveThreadIdInBE(
  threadId: string | undefined,
  additionalInfo: string | undefined
) {
  if (!threadId) return;
  try {
    const response = await axios.post("/api/chat/postSaveThreadIdInBE", {
      traceId: threadId,
      title: additionalInfo?.toString() ?? "noTitle",
    });

    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export async function createRun(
  threadId: string | undefined,
  assistant_id: string,
  setRunId: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (!threadId) return;
  try {
    const response = await axios.post(`/api/chat/run?threadId=${threadId}`, {
      assistant_id: assistant_id,
    });

    const data = await response;
    setRunId(data.data.data.id);
    return data.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveRun(threadId: string | undefined, run_id: string) {
  if (!threadId) return;
  try {
    const response = await fetch(`/api/chat/run?threadId=${threadId}&run_id=${run_id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMessages(threadId: string | undefined) {
  if (!threadId) return;
  try {
    const response = await fetch(`/api/chat/messages?threadId=${threadId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
}
export async function createUserMessage(threadId: string | undefined, textMessage: string) {
  if (!threadId) return;
  try {
    const response = await axios.post(`/api/chat/messages?threadId=${threadId}`, {
      role: "user",
      content: textMessage,
    });

    const data = await response;
    return data.data.data;
  } catch (error) {
    console.error(error);
  }
}
