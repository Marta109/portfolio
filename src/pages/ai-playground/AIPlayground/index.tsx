import {useMemo, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Alert, Button, Card, Flex, Input, Space, Typography} from "antd";
import {generateContent} from "@/services/geminiApi";
import styles from "./AIPlayground.module.css";

type PlaygroundError = {
  title: string;
  detail?: string;
};

function getErrorFromUnknown(err: unknown): PlaygroundError {
  if (err instanceof Error) return {title: "Request failed.", detail: err.message};
  return {title: "Request failed.", detail: "Something went wrong."};
}

export function AIPlayground() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState<PlaygroundError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copyLabel, setCopyLabel] = useState<"Copy" | "Copied!">("Copy");

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

    setIsLoading(true);
    setError(null);
    setResponseText("");

    try {
      const text = await generateContent(trimmed);

      if (!text.trim()) {
        setError({
          title: "Empty response.",
          detail: "The API returned no text. Try a different prompt.",
        });
        setResponseText("");
        return;
      }

      setResponseText(text);
    } catch (err) {
      setError(getErrorFromUnknown(err));
    } finally {
      setIsLoading(false);
    }
  }

  function onClear() {
    setPrompt("");
    setResponseText("");
    setError(null);
    setCopyLabel("Copy");
  }

  async function onCopy() {
    if (!responseText) return;

    try {
      await navigator.clipboard.writeText(responseText);
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

  return (
    <div className={styles.root}>
      <Flex align="flex-start" justify="space-between" gap="large" wrap="wrap">
        <div className={styles.headerCopy}>
          <Typography.Title level={2} className={styles.title}>
            Ask About Marta
          </Typography.Title>
          <Typography.Paragraph className={styles.subtitle}>
            Ask questions about Marta's background, skills, and experience.
          </Typography.Paragraph>
        </div>
      </Flex>

      <Card className={styles.card} bordered>
        <Space direction="vertical" size="middle" style={{width: "100%"}}>
          <div>
            <Typography.Text strong className={styles.label}>
              Prompt
            </Typography.Text>
            <Input.TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here…"
              className={styles.textarea}
              autoSize={{minRows: 6, maxRows: 14}}
            />
          </div>

          <Flex gap="small" wrap="wrap">
            <Button type="primary" onClick={onSend} loading={isLoading} disabled={!canSend}>
              Send
            </Button>
            <Button onClick={onClear} disabled={isLoading && !prompt}>
              Clear
            </Button>
          </Flex>
        </Space>
      </Card>

      {error && (
        <Alert
          type="error"
          showIcon
          className={styles.alert}
          message={error.title}
          description={error.detail}
        />
      )}

      {(isLoading || responseText) && (
        <Card
          className={styles.card}
          bordered
          title={<Typography.Text strong>Response</Typography.Text>}>
          {isLoading && <Typography.Text>Loading...</Typography.Text>}
          {!isLoading && responseText && (
            <>
              <div className={styles.markdown}>
                <ReactMarkdown>{responseText}</ReactMarkdown>
              </div>
              <Flex justify="flex-end" className={styles.copyRow}>
                <Button onClick={onCopy}>{copyLabel}</Button>
              </Flex>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
