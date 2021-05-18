import React, { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    code: {
      backgroundColor: 'rgb(245, 242, 240)',
      color: 'rgb(221, 74, 104)',
      padding: '0.2em',
    },
  })
);

type InlineCodeBlockProps = {
  children?: ReactNode;
};
const InlineCodeBlock = ({ children }: InlineCodeBlockProps) => {
  const classes = useStyles();

  return <code className={classes.code}>{children}</code>;
};

type CodeProps = {
  node: Record<string, unknown>;
  children: ReactNode[];
  className?: string;
  inline?: boolean;
};
const componentsMap = {
  code({
    node,
    children,
    className,
    inline,
    ...otherProps
  }: CodeProps): ReactNode {
    const language = /language-(\w+)/.exec(className || '')?.[1];

    return inline ? (
      <InlineCodeBlock {...otherProps}>{children}</InlineCodeBlock>
    ) : (
      <SyntaxHighlighter language={language} PreTag="div" {...otherProps}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

export type MarkdownProps = {
  children: string;
};
export const Markdown = ({ children }: MarkdownProps): ReactElement => {
  return (
    <ReactMarkdown remarkPlugins={[gfm]} components={componentsMap}>
      {children}
    </ReactMarkdown>
  );
};
export default Markdown;
