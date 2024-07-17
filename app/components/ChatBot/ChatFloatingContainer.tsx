"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ChatIcon from "@/app/assets/svg/ChatIcon";
import NewConvoIcon from "@/app/assets/svg/NewConvoIcon";
import ArrowUpWithStickIcon from "@/app/assets/svg/ArrowUpWithStickIcon";

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
//! DO NOT DELETE THE COMMENTS FOR NOW
export default function ChatFloatingContainer({}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [threadId, setThreadId] = useState(getCookie("threadId") || undefined);
  const [runId, setRunId] = useState<string | undefined>(undefined);
  const [userMessage, setUserMessage] = useState<string>("");

  const messageInputRef = useRef(null);

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
    if (isTyping) return;

    const createUserMessageData = await createUserMessage(threadId, newMessage);
    setMessages([...messages, ...[createUserMessageData]]);
    setIsTyping(true);
    setUserMessage("");
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
    <div className="bottom-20 absolute right-[20px] overflow-hidden rounded-[14px] !font-modernist">
      <div
        onClick={() => {
          if (userMessage) {
            handleNewUserMessage(userMessage);
          }
        }}
        className="absolute z-50 bottom-[13px] right-[18px] h-[28px] w-[28px] rounded-full flex items-center justify-center bg-grey1 cursor-pointer"
      >
        <ArrowUpWithStickIcon />
      </div>
      <ChatContainer
        style={{
          height: "561px",
          width: "403px",
        }}
      >
        <ConversationHeader className="!bg-blue1 !border-0">
          <Avatar
            className="h-full flex items-center justify-center"
            name="SlotGPT"
          >
            <ChatIcon />
          </Avatar>
          <ConversationHeader.Content>
            <div className="flex items-center justify-between">
              <div className="text-white font-bold font-modernist">SlotGPT</div>
              <div
                className="text-white cursor-pointer"
                onClick={() => {
                  deleteThread(threadId, deleteCookie, setThreadId);
                  // deleteThread(threadId);
                }}
              >
                <NewConvoIcon />
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
                content="SlotGPT is typing"
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
                  <ChatIcon />
                </Avatar>
              )}
            </Message>
          ))}
        </MessageList>
        <MessageInput
          value={userMessage}
          ref={messageInputRef}
          onChange={(e) => setUserMessage(e)}
          className="!bg-dark2 !border-0 text-base font-modernist"
          placeholder="Message SlotGPT"
          onSend={handleNewUserMessage}
          attachButton={false}
          sendButton={false}
        />
      </ChatContainer>
    </div>
  );
}
