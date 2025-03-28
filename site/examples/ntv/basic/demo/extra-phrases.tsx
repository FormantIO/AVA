import React from 'react';

import ReactDOM from 'react-dom';
import { NarrativeTextVis } from '@formant/ava-react';

import type { NarrativeTextSpec } from '@formant/ava';

// 在使用代码中，需要加入类似下面的方式的样式引用从而支持渲染正确的公式样式
// import 'katex/dist/katex.min.css';

const spec: NarrativeTextSpec = {
  sections: [
    {
      paragraphs: [
        {
          type: 'normal',
          phrases: [
            {
              type: 'text',
              value: '通过 escape 类型短语换行：',
            },
            {
              type: 'escape',
              value: '\n',
            },
            {
              type: 'text',
              value: '回车：',
            },
            {
              type: 'escape',
              value: '\r',
            },
          ],
        },
        {
          type: 'normal',
          phrases: [
            {
              type: 'text',
              value: '渲染公式：',
            },
            {
              type: 'formula',
              // eslint-disable-next-line no-useless-escape, quotes
              value: `c = \\pm\\sqrt{a^2 + b^2}`,
            },
          ],
        },
      ],
    },
  ],
};

ReactDOM.render(<NarrativeTextVis spec={spec} />, document.getElementById('container'));
