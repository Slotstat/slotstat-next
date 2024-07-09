"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import logo from "../../assets/img/logoSmall.png";
// import logo from "../assets/img/logoSmall.png";
import Image from "next/image";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import {
  createRun,
  createThread,
  createUserMessage,
  deleteThread,
  getMessages,
  getThread,
  retrieveRun,
} from "@/lib/clientSide/chatGPT/chatBotApiRequests";

type Props = {};
type Content = {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
};

export interface ChatMessage {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: string;
  content: Content[];
  attachments: any[];
  metadata: Record<string, any>;
}

const initialMessage: ChatMessage = {
  id: "",
  object: "thread.message",
  created_at: Date.now(),
  assistant_id: null,
  thread_id: "",
  run_id: null,
  role: "assistant",
  content: [
    {
      type: "text",
      text: {
        value: "Hey there! How can I help you?",
        annotations: [],
      },
    },
  ],
  attachments: [],
  metadata: {},
};

export default function ChatFloatingContainer({}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [threadId, setThreadId] = useState(getCookie("threadId") || undefined);
  const [runId, setRunId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (threadId) {
      getMessages(threadId, setMessages, initialMessage);
    } else {
      createThread(setThreadId, setCookie);
    }

    setMessages([initialMessage]);
  }, [threadId]);

  function pollRetrieveRun(
    threadId: string | undefined,
    run_id: string,
    next: (
      threadId: string | undefined,
      setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
      initialMessage: ChatMessage
    ) => void
  ) {
    setIsTyping(true);
    const intervalId = setInterval(async () => {
      const data = await retrieveRun(threadId, run_id);
      if (data?.status === "completed") {
        clearInterval(intervalId);
        next(threadId, setMessages, initialMessage);
        setIsTyping(false);
      }
    }, 500);
  }

  const handleNewUserMessage = async (newMessage: string) => {
    const createUserMessageData = await createUserMessage(threadId, newMessage);
    setMessages([...messages, ...[createUserMessageData]]);

    if (createUserMessageData) {
      const createdRunData = await createRun(
        threadId,
        "asst_AY7RewVO5DCaloGwj9VLohWk",
        setRunId
      );

      pollRetrieveRun(threadId, createdRunData.id, getMessages);
    }
  };

  return (
    <div className="bottom-20 absolute right-[20px] overflow-hidden rounded-[14px]">
      <ChatContainer
        style={{
          height: "500px",
          width: "400px",
        }}
      >
        <ConversationHeader className="!bg-blue1 !border-0">
          <div></div>
          <Avatar
            className="h-full flex items-center justify-center"
            name="Emily"
          >
            {/* <Image src={logo} alt="" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M20.433 10.186a4.982 4.982 0 00-.428-4.093 5.04 5.04 0 00-5.427-2.417A4.984 4.984 0 0010.819 2 5.04 5.04 0 006.013 5.49 4.985 4.985 0 002.68 7.906a5.04 5.04 0 00.62 5.909 4.982 4.982 0 00.428 4.092 5.04 5.04 0 005.427 2.418A4.981 4.981 0 0012.914 22a5.04 5.04 0 004.81-3.492 4.984 4.984 0 003.331-2.417 5.04 5.04 0 00-.621-5.907v.002zm-7.517 10.507a3.736 3.736 0 01-2.4-.868c.03-.016.084-.046.118-.067l3.983-2.3a.648.648 0 00.327-.567v-5.614l1.684.972a.06.06 0 01.032.046v4.65a3.753 3.753 0 01-3.744 3.748zm-8.053-3.44a3.732 3.732 0 01-.447-2.511c.03.017.082.05.118.07l3.983 2.3a.649.649 0 00.654 0l4.862-2.807v1.944a.062.062 0 01-.024.052l-4.025 2.324a3.752 3.752 0 01-5.12-1.372zM3.815 8.56a3.736 3.736 0 011.95-1.643l-.001.137v4.601a.648.648 0 00.327.566l4.862 2.807L9.269 16a.06.06 0 01-.056.005L5.186 13.68A3.752 3.752 0 013.814 8.56h.001zm13.829 3.218l-4.862-2.807 1.683-.972a.06.06 0 01.057-.005l4.026 2.325a3.75 3.75 0 01-.579 6.764v-4.738a.647.647 0 00-.325-.567zm1.675-2.521a5.397 5.397 0 00-.118-.07l-3.983-2.3a.648.648 0 00-.654 0L9.702 9.693V7.75a.062.062 0 01.024-.052l4.025-2.322a3.747 3.747 0 015.566 3.881h.002zM8.787 12.721l-1.684-.972a.06.06 0 01-.032-.046v-4.65a3.749 3.749 0 016.146-2.878 2.81 2.81 0 00-.118.067l-3.982 2.3a.646.646 0 00-.328.566l-.002 5.612v.001zm.914-1.97l2.166-1.252 2.165 1.25v2.501l-2.165 1.25L9.7 13.25v-2.5z"
              ></path>
            </svg>
          </Avatar>
          <ConversationHeader.Content>
            <div className="flex gap-2 items-center">
              <div className="text-white">ChatGPT</div>
              {/* <div
                className="text-white cursor-pointer"
                onClick={() => {
                  createThread(setThreadId, setCookie);
                }}
              >
                create
              </div>
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  getThread(threadId, setThreadId);
                }}
              >
                retrieve
              </div>
             
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  getMessages(threadId, setMessages, initialMessage);
                }}
              >
                messages
              </div>
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  if (!runId) return;
                  retrieveRun(threadId, runId);
                }}
              >
                run
              </div> */}
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  deleteThread(threadId, deleteCookie, setThreadId);
                  // deleteThread(threadId);
                }}
              >
                delete
              </div>
            </div>
          </ConversationHeader.Content>
        </ConversationHeader>
        <MessageList
          className="!bg-dark2"
          typingIndicator={
            isTyping && (
              <TypingIndicator
                className="!bg-dark2"
                content="SlotStat is typing"
              />
            )
          }
        >
          {/* <MessageSeparator className="!bg-dark2 " content="Today" /> */}
          {messages.map((msg, i) => (
            <Message
              key={i}
              model={{
                direction: msg.role === "assistant" ? "incoming" : "outgoing",
                message: msg.content[0].text.value,
                position: "single",
                sender: msg.role === "assistant" ? "ChatGPT" : "",
                // sentTime: "15 mins ago",
              }}
              className="!bg-transparent"
              data-tooltip-class-name=""
            >
              {msg.role === "assistant" && (
                <Avatar
                  name="ChatGPT"
                  className="h-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M20.433 10.186a4.982 4.982 0 00-.428-4.093 5.04 5.04 0 00-5.427-2.417A4.984 4.984 0 0010.819 2 5.04 5.04 0 006.013 5.49 4.985 4.985 0 002.68 7.906a5.04 5.04 0 00.62 5.909 4.982 4.982 0 00.428 4.092 5.04 5.04 0 005.427 2.418A4.981 4.981 0 0012.914 22a5.04 5.04 0 004.81-3.492 4.984 4.984 0 003.331-2.417 5.04 5.04 0 00-.621-5.907v.002zm-7.517 10.507a3.736 3.736 0 01-2.4-.868c.03-.016.084-.046.118-.067l3.983-2.3a.648.648 0 00.327-.567v-5.614l1.684.972a.06.06 0 01.032.046v4.65a3.753 3.753 0 01-3.744 3.748zm-8.053-3.44a3.732 3.732 0 01-.447-2.511c.03.017.082.05.118.07l3.983 2.3a.649.649 0 00.654 0l4.862-2.807v1.944a.062.062 0 01-.024.052l-4.025 2.324a3.752 3.752 0 01-5.12-1.372zM3.815 8.56a3.736 3.736 0 011.95-1.643l-.001.137v4.601a.648.648 0 00.327.566l4.862 2.807L9.269 16a.06.06 0 01-.056.005L5.186 13.68A3.752 3.752 0 013.814 8.56h.001zm13.829 3.218l-4.862-2.807 1.683-.972a.06.06 0 01.057-.005l4.026 2.325a3.75 3.75 0 01-.579 6.764v-4.738a.647.647 0 00-.325-.567zm1.675-2.521a5.397 5.397 0 00-.118-.07l-3.983-2.3a.648.648 0 00-.654 0L9.702 9.693V7.75a.062.062 0 01.024-.052l4.025-2.322a3.747 3.747 0 015.566 3.881h.002zM8.787 12.721l-1.684-.972a.06.06 0 01-.032-.046v-4.65a3.749 3.749 0 016.146-2.878 2.81 2.81 0 00-.118.067l-3.982 2.3a.646.646 0 00-.328.566l-.002 5.612v.001zm.914-1.97l2.166-1.252 2.165 1.25v2.501l-2.165 1.25L9.7 13.25v-2.5z"
                    ></path>
                  </svg>
                </Avatar>
              )}
              <Message.TextContent
                className={msg.role === "assistant" ? "!bg-transparent" : ""}
              >
                <div>{msg.content[0].text.value}</div>
              </Message.TextContent>
              {/* <Message.CustomContent
                className={msg.role === "assistant" ? "!bg-transparent" : ""}
              >
                <div>{msg.content[0].text.value}</div>
              </Message.CustomContent> */}
            </Message>
          ))}
        </MessageList>
        <MessageInput
          className="!bg-dark2 !border-0"
          placeholder="Type message here"
          onSend={handleNewUserMessage}
        />
      </ChatContainer>
    </div>
  );
}
