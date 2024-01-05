import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const LogsSection = ({ selectedRun }) => {
  if (!selectedRun) return null;

  const logs = selectedRun?.logs.join('\n');

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Logs</h2>
      <Highlight theme={themes.vsDark} code={logs} language="bash">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} language-bash`} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <span className="line-number-style">{i + 1}</span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </section>
  );
};

export default LogsSection;