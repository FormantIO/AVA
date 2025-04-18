import React, { useRef, useEffect } from 'react';

import { v4 } from 'uuid';
import { isFunction, isNull, isUndefined } from 'lodash';

import { classnames as cx } from '../utils';

import { NTV_PREFIX_CLS } from './constants';
import { Container } from './styled';
import { Headline } from './paragraph';
import { Section } from './section';
import { presetPluginManager } from './chore/plugin';
import { copyToClipboard, getSelectionContentForCopy } from './chore/exporter';

import type { NarrativeTextVisProps } from './types';

export function NarrativeTextVis({
  spec,
  size = 'normal',
  theme = 'dark',
  palette,
  pluginManager = presetPluginManager,
  showCollapse = false,
  copyNarrative,
  ...events
}: NarrativeTextVisProps) {
  const narrativeDomRef = useRef<HTMLDivElement>(null);

  const { headline, sections, styles, className } = spec;
  const themeStyles = { theme, size, palette };

  const {
    onClickNarrative,
    onMouseEnterNarrative,
    onMouseLeaveNarrative,
    onCopySuccess,
    onCopyFailure,
    ...sectionEvents
  } = events || {};

  const onClick = () => {
    onClickNarrative?.(spec);
  };

  const onMouseEnter = () => {
    onMouseEnterNarrative?.(spec);
  };

  const onMouseLeave = () => {
    onMouseLeaveNarrative?.(spec);
  };

  useEffect(() => {
    const onCopy = async (event: ClipboardEvent) => {
      const { plainText, html } = await getSelectionContentForCopy();
      if (isFunction(copyNarrative)) {
        copyNarrative({ spec, plainText, html });
      } else if (isUndefined(copyNarrative)) {
        // 仅成功解析出 plainText 才拦截处理，其他情况下走默认处理
        // 如果没有传递复制方法，默认行为是拦截用户复制操作(使用快捷键或右键选择复制均会触发)，将转换后的内容放进剪切板
        // if no `copyNarrative` passed in, the default behavior when user conduct `copy` is to put the transformed html and plainText into user's clipboard
        // TODO @羽然 此处修改逻辑仅针对复制 disabled Input 的情况，还有更多情况待进一步兼容
        if (plainText) {
          event.preventDefault();
          copyToClipboard(html, plainText, onCopySuccess, onCopyFailure);
        }
      }
    };
    if (!isNull(copyNarrative)) {
      narrativeDomRef.current?.addEventListener('copy', onCopy);
    }
    return () => {
      narrativeDomRef.current?.removeEventListener('copy', onCopy);
    };
  }, [copyNarrative]);

  return (
    <Container
      className={cx(className, `${NTV_PREFIX_CLS}-container`)}
      style={styles}
      {...themeStyles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={narrativeDomRef}
    >
      {headline ? <Headline spec={headline} pluginManager={pluginManager} {...themeStyles} {...sectionEvents} /> : null}
      {sections
        ? sections?.map((section) => (
            <Section
              key={section.key || v4()}
              spec={section}
              pluginManager={pluginManager}
              showCollapse={showCollapse}
              {...themeStyles}
              {...sectionEvents}
            />
          ))
        : null}
    </Container>
  );
}
