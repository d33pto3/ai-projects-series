import React from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export const Message = ({ role, content }: Props) => {
  return (
    <div
      className={`my-2 p-2 rounded-md ${role === "user" ? "bg-blue-100 self-end" : "bg-gray-800 text-white self-start"}`}
    >
      <ReactMarkdown
        components={{
          code({ node, inline, className, children }) {
            return !inline ? (
              <CodeBlock code={String(children)} language="javascript" />
            ) : (
              <code>{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
