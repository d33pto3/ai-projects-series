import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = { code: string; language?: string };

export const CodeBlock = ({ code, language = "javascript" }: Props) => {
  return (
    <SyntaxHighlighter language={language} style={oneDark} wrapLongLines>
      {code}
    </SyntaxHighlighter>
  );
};
