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
    <div className="bottom-20 absolute right-[20px] rounded-sm overflow-hidden shadow-gray-700 shadow-lg bg-dark2">
      <ChatContainer
        style={{
          height: "500px",
          width: "400px",
        }}
      >
        <ConversationHeader className="!bg-dark2 ">
          <Avatar name="Emily">
            <Image src={logo} alt="" />
          </Avatar>
          <ConversationHeader.Content>
            <div className="flex gap-2 items-center">
              <div className="text-white">ChatGPT</div>
              <div
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
                  deleteThread(threadId, deleteCookie, setThreadId);
                  // deleteThread(threadId);
                }}
              >
                delete
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
              </div>
            </div>
          </ConversationHeader.Content>
        </ConversationHeader>
        <MessageList
          className="!bg-dark2 "
          typingIndicator={
            isTyping && (
              <TypingIndicator
                className="!bg-dark2 "
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
            >
              {msg.role === "assistant" && (
                <Avatar name="ChatGPT">
                  <Image src={logo} alt="" />
                </Avatar>
              )}
            </Message>
          ))}
        </MessageList>
        <MessageInput
          className="!bg-dark2 "
          placeholder="Type message here"
          onSend={handleNewUserMessage}
        />
      </ChatContainer>
    </div>
  );
}
