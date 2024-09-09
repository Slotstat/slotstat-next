import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import logo from "../../assets/img/logoSmall.png";
// import Image from "next/image";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import {
  createRun,
  createThread,
  createUserMessage,
  deleteThread,
  getMessages,
  postSaveThreadIdInBE,
  retrieveRun,
} from "@/lib/clientSide/chatGPT/chatBotApiRequests";
import ChatIcon from "@/app/assets/svg/ChatIcon";
import NewConvoIcon from "@/app/assets/svg/NewConvoIcon";

import moment from "moment";
import { ArrowLeft, ArrowUpWithStickIcon } from "@/app/assets/svg/SVGComponents";

type Props = {
  setRotated: (e: boolean) => void;
};
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
  id: "firstMessageId",
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
export default function ChatFloatingContainer({ setRotated }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [warningMessage, setWarningMessage] = useState<ChatMessage | undefined>();
  const [isTyping, setIsTyping] = useState(false);

  const [threadId, setThreadId] = useState<string | undefined>(getCookie("threadId") || undefined);
  // const [threadId, setThreadId] = useState<string | undefined>(undefined);
  const [runId, setRunId] = useState<string | undefined>(undefined);
  const [userMessage, setUserMessage] = useState<string>("");

  const messageInputRef = useRef(null);

  const mountLoader = async () => {
    if (threadId) {
      getMessages(threadId, setMessages, initialMessage);
    } else {
      const threadData = await createThread(setThreadId, setCookie);
      if (threadData) {
        console.log("threadData", threadData?.id, threadData?.created_at);
        postSaveThreadIdInBE(threadData?.id, threadData?.created_at);
      }
    }

    setMessages([initialMessage]);
  };

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
    }, 700);
  }

  const handleNewUserMessage = async (newMessage: string) => {
    if (isTyping) return;
    if (messages.length >= 41) {
      const limitMessage = messages[messages.length - 40];
      // const limitMessage = messages[messages.length - 40];

      const createdAtMoment = moment(limitMessage.created_at * 1000);
      const now = moment();

      const minutesPassed = now.diff(createdAtMoment, "minutes");

      if (minutesPassed < 60) {
        let initialMessageWarning = { ...initialMessage };
        initialMessageWarning.id = `warningId + ${now}`;
        initialMessageWarning.content[0].text.value = `Limit reached, please get back in ${
          60 - minutesPassed
        } minutes!`;

        setWarningMessage(initialMessageWarning);

        return;
      } else {
        setWarningMessage(undefined);
      }
    }
    if (warningMessage) {
      setWarningMessage(undefined);
    }

    const createUserMessageData = await createUserMessage(threadId, newMessage);
    setMessages([...messages, ...[createUserMessageData]]);
    setIsTyping(true);
    setUserMessage("");
    if (createUserMessageData) {
      const createdRunData = await createRun(threadId, "asst_fBbZ3QSAzs3Tm45EhkxNxQpx", setRunId);

      pollRetrieveRun(threadId, createdRunData.id, getMessages);
    }
  };

  useEffect(() => {
    mountLoader();
  }, [threadId]);

  return (
    <div
      className={`overflow-hidden !font-modernist fixed bottom-0 right-0 top-0 w-screen 
    lg:absolute lg:rounded-[14px] lg:w-auto lg:h-auto lg:right-[20px] lg:bottom-20 lg:left-auto lg:top-auto `}
      // style={{ height: viewportHeight }}
    >
      <button
        type="button"
        onClick={() => {
          if (userMessage) {
            handleNewUserMessage(userMessage);
          }
        }}
        className={`absolute z-50 bottom-[13px] right-[18px] h-[28px] w-[28px] rounded-full flex items-center justify-center ${
          userMessage ? "bg-blue1" : "bg-grey1"
        } cursor-pointer`}
      >
        <ArrowUpWithStickIcon isWriting={userMessage ? true : false} />
      </button>
      <ChatContainer className="lg:h-[561px] lg:w-[403px] h-full w-full ">
        <ConversationHeader className="!bg-blue1 !border-0">
          <Avatar className="h-full flex items-center justify-center" name="SlotGPT">
            <div className="hidden lg:flex">
              <ChatIcon />
            </div>
            <div
              onClick={() => {
                setRotated(false);
              }}
              className="lg:hidden flex cursor-pointer"
            >
              <ArrowLeft />
            </div>
          </Avatar>
          <ConversationHeader.Content>
            <div className="flex items-center justify-between -ml-3.5">
              <div className="flex lg:hidden" />
              <div className="text-white font-bold font-modernist mr-0 lg:mr-0">SlotGPT</div>

              {/* //! before release leave this here so testing will be easier  */}
              <button
                type="button"
                className="text-white cursor-pointer "
                onClick={() => {
                  deleteThread(threadId, deleteCookie, setThreadId);
                  // deleteThread(threadId);
                }}
              >
                <NewConvoIcon />
              </button>
              {/* <div className="text-white rounded-md bg-dark1 px-4 py-1 text-sm">
                Beta
              </div> */}
              {/* <div className=" text-white rounded-md bg-dark1 px-4 py-1 text-sm">Beta</div> */}
            </div>
          </ConversationHeader.Content>
        </ConversationHeader>
        <MessageList
          className="!bg-dark2 !text-white"
          typingIndicator={
            isTyping && (
              <TypingIndicator
                className="!bg-dark2 !text-white !ml-3"
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
                direction: msg?.role === "assistant" ? "incoming" : "outgoing",
                message: msg?.content[0].text.value,
                position: "single",
                sender: msg?.role === "assistant" ? "ChatGPT" : "",
                // sentTime: "15 mins ago",
              }}
              className="!bg-transparent"
              data-tooltip-class-name=""
            >
              {msg?.role === "assistant" && (
                <Avatar name="ChatGPT" className="h-full flex items-center justify-center">
                  <ChatIcon />
                </Avatar>
              )}
            </Message>
          ))}
          {warningMessage && (
            <Message
              model={{
                direction: warningMessage.role === "assistant" ? "incoming" : "outgoing",
                // message: warningMessage.content[0].text.value,
                message: `<div class="text-red" style={{color: "red"}}>${warningMessage.content[0].text.value}</div>`,
                position: "single",
                sender: warningMessage.role === "assistant" ? "ChatGPT" : "",
                // sentTime: "15 mins ago",
              }}
              className="!bg-transparent red-message"
              data-tooltip-class-name=""
            >
              {warningMessage.role === "assistant" && (
                <Avatar name="ChatGPT" className="h-full flex items-center justify-center">
                  <ChatIcon />
                </Avatar>
              )}
            </Message>
          )}
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
          // onFocus={() => setIsKeyboardVisible(true)}
          // onBlur={() => setIsKeyboardVisible(false)}
        />
      </ChatContainer>
    </div>
  );
}
