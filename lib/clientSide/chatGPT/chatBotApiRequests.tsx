"use client";

import { ChatMessage } from "@/app/components/ChatBot/ChatFloatingContainer";
import { baseUrl } from "@/lib/baseURL";
import axios from "axios";
// import { deleteCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
// import { cookies } from "next/headers";

// const bearer = `Bearer sk-k4uT6i_50f1G6is_rOg--sqF6FW7Jzpns_sopgAYuST3BlbkFJe3HX2ZlXIuOYdI3vAqG3B_NobuA24EnuaweT_wHhUA`;
const bearer = `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;

export async function createThread(
  setThreadId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >,
  setCookie: (name: string, value: string) => void
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/threads",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          // Authorization: `Bearer sk-proj-4GhhqhofmtdEc9CJDbUMT3BlbkFJraPWAfpc9LO9WaKzRjta`,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );
    setThreadId(response.data.id);
    setCookie("threadId", response.data.id);
    // console.log("create thread data", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteThread(
  threadId: string | undefined,
  deleteCookie: (
    key: string,
    options?: OptionsType | undefined
  ) => void,
  setThreadId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
) {
  if (!threadId) return;
  await axios.delete(
    `https://api.openai.com/v1/threads/${threadId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        "OpenAI-Beta": "assistants=v2",
      },
    }
  );
  deleteCookie("threadId");
  setThreadId && setThreadId(undefined);
}

export async function getThread(
  threadId: string | undefined,
  setThreadId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
) {
  if (!threadId) return;
  try {
    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );
    setThreadId && setThreadId(response.data.id);
    // console.log("get thread data", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createUserMessage(
  threadId: string | undefined,
  textMessage: string
) {
  if (!threadId) return;
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      { role: "user", content: textMessage },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    // console.log("create new message data", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createRun(
  threadId: string | undefined,
  assistant_id: string,
  setRunId: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (!threadId) return;
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      { assistant_id: assistant_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );
    setRunId(response.data.id);
    // console.log("get create run message data", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function retrieveRun(
  threadId: string | undefined,
  run_id: string
) {
  if (!threadId) return;
  try {
    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/runs/${run_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    // console.log("get retrieve run message data", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMessages(
  threadId: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  initialMessage: ChatMessage
) {
  if (!threadId) return;
  try {
    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages?order=asc&limit=100`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    // console.log("get messages list data", response.data);
    setMessages([...[initialMessage], ...response.data.data]);
    return response.data;
  } catch (error) {
    // levani chaxede amas
    // deleteCookie("");
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
    const response = await axios.post(
      `${baseUrl}/api/chat/trace`,
      { traceId: threadId, title: additionalInfo ?? "noTitle" },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    console.log("get messages list data", response);

    return response.data;
  } catch (error) {
    // levani chaxede amas
    // deleteCookie("");
    console.error(error);
    return "error";
  }
}
