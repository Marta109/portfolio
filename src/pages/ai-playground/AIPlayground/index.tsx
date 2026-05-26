import {useEffect, useMemo, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Alert, Button, Card, Flex, Input, Typography} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {generateContent} from "@/services/geminiApi";
import styles from "./AIPlayground.module.css";

type PlaygroundError = {
  title: string;
  detail?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function getErrorFromUnknown(err: unknown): PlaygroundError {
  if (err instanceof Error) return {title: "Request failed.", detail: err.message};
  return {title: "Request failed.", detail: "Something went wrong."};
}

export function AIPlayground() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<PlaygroundError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copyLabel, setCopyLabel] = useState<"Copy" | "Copied!">("Copy");

  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const canSend = useMemo(() => {
    return prompt.trim().length > 0 && !isLoading;
  }, [prompt, isLoading]);

  async function onSend() {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError({title: "Prompt is empty.", detail: "Type a prompt first."});
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);
    setError(null);

    try {
      const text = await generateContent(trimmed);

      if (!text.trim()) {
        setError({
          title: "Empty response.",
          detail: "The API returned no text. Try a different prompt.",
        });
        return;
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(getErrorFromUnknown(err));
    } finally {
      setIsLoading(false);
    }
  }

  function onClear() {
    setPrompt("");
  }

  async function onCopy() {
    const copyText = lastAssistantMessage?.text;
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopyLabel("Copied!");
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopyLabel("Copy"), 1200);
    } catch {
      setError({
        title: "Copy failed.",
        detail: "Your browser blocked clipboard access. Try copying manually.",
      });
    }
  }

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const promptSuggestions = [
    "Tell me about Marta's front-end experience.",
    "What skills does Marta use in her projects?",
    "Summarize Marta's education and portfolio strengths.",
  ];

  const lastAssistantMessage = [...messages].reverse().find((message) => message.role === "assistant");
  const responseStatus = isLoading
    ? "Thinking..."
    : lastAssistantMessage
    ? "Answer ready"
    : "Your answer will appear here.";

  return (
    <div className={styles.root}>
      <div className={styles.headerCopy}>
        <Typography.Title level={2} className={styles.title}>
          Ask about Martha
        </Typography.Title>
        <Typography.Paragraph className={styles.subtitle}>
          Chat with Marta's assistant to get fast, friendly answers about her.
        </Typography.Paragraph>
      </div>

      <div className={styles.chatGrid}>
        <Card className={styles.chatCard} bordered={false}>
          <div className={styles.panelHeader}>
            <Typography.Text className={styles.cardLabel}>Marta's assistant</Typography.Text>
            <Typography.Title level={4} className={styles.cardTitle}>
              Ask anything and get a quick answer
            </Typography.Title>
            <Typography.Paragraph className={styles.cardIntro}>
              Write your question below and let the assistant explain Marta’s achievements, experience, and portfolio in a clear way.
            </Typography.Paragraph>
          </div>

          <div className={styles.chatWindow} ref={chatWindowRef}>
            {messages.length === 0 && !isLoading ? (
              <div className={styles.assistantBubble}>
                <Typography.Text strong className={styles.bubbleTitle}>
                  Marta's assistant
                </Typography.Text>
                <Typography.Paragraph className={styles.messageText}>
                  Hello! I'm Marta's AI assistant. Ask me anything about Marta's achievements, experience, or portfolio.
                </Typography.Paragraph>
              </div>
            ) : null}

            {messages.map((message) => (
              <div key={message.id} className={styles.messageRow}>
                <div className={message.role === "user" ? styles.userBubble : styles.assistantBubble}>
                  <Typography.Text strong className={styles.bubbleTitle}>
                    {message.role === "user" ? "You" : "Marta's assistant"}
                  </Typography.Text>
                  {message.role === "assistant" ? (
                    <div className={styles.markdown}>
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <Typography.Paragraph className={styles.messageText}>
                      {message.text}
                    </Typography.Paragraph>
                  )}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className={styles.messageRow}>
                <div className={styles.assistantBubble}>
                  <Typography.Text strong className={styles.bubbleTitle}>
                    Marta's assistant
                  </Typography.Text>
                  <Typography.Paragraph className={styles.messageText}>
                    Thinking... please wait a moment.
                  </Typography.Paragraph>
                </div>
              </div>
            ) : null}
          </div>

          {lastAssistantMessage && !isLoading ? (
            <Flex justify="flex-end" className={styles.copyRow}>
              <Button type="default" onClick={onCopy} className={styles.copyBtnModern}>
                {copyLabel}
              </Button>
            </Flex>
          ) : null}

          <div className={styles.controls}>
            <Input.TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about Marta's skills, projects, or experience..."
              className={styles.textarea}
              autoSize={{minRows: 4, maxRows: 9}}
            />

            <div className={styles.actionBar}>
              <div className={styles.actionButtonRow}>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={onSend}
                  loading={isLoading}
                  disabled={!canSend}
                  className={styles.sendPrimary}>
                  Send
                </Button>
                <Button type="default" onClick={onClear} disabled={!prompt} className={styles.clearSecondary}>
                  Clear
                </Button>
              </div>
              <Typography.Text type="secondary" className={styles.statusText}>
                {responseStatus}
              </Typography.Text>
            </div>
          </div>

          <div className={styles.suggestions}>
            <Typography.Text strong className={styles.suggestionsLabel}>
              Quick prompts
            </Typography.Text>
            <div className={styles.suggestionList}>
              {promptSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="default"
                  className={styles.suggestionChip}
                  onClick={() => setPrompt(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>

      </div>

      {error && (
        <Alert
          type="error"
          showIcon
          className={styles.alert}
          message={error.title}
          description={error.detail}
        />
      )}
    </div>
  );
}
