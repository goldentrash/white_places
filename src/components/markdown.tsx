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

const InlineCodeBlock = (props: { children?: ReactNode }) => {
  const classes = useStyles();

  return <code className={classes.code}>{props.children}</code>;
};

const componentsMap = {
  code(props: {
    node: Record<string, unknown>;
    children: ReactNode[];
    className?: string;
    inline?: boolean;
  }): ReactNode {
    const { node, children, className, inline, ...otherProps } = props;
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

export const Markdown = (props: MarkdownProps): ReactElement => {
  return (
    <ReactMarkdown remarkPlugins={[gfm]} components={componentsMap}>
      {props.children}
    </ReactMarkdown>
  );
};
