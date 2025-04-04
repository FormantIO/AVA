import type { ReactNode } from 'react';
import type {
  EntityType,
  PhraseSpec,
  HeadlineSpec,
  ParagraphSpec,
  BulletItemSpec,
  SectionSpec,
  NarrativeTextSpec,
} from '@formant/ava';
import type { PluginManager } from '../chore/plugin';

export type ThemeType = 'light' | 'dark';
export type SizeType = 'normal' | 'small';
export type PaletteType = Partial<{
  color: string;
  /**
   * @description Compare the indicator with the assessment attribute value of 'positive'. The color Settings are displayed
   * @description.zh-CN 对比类指标，对应 assessment 属性值 'positive' 显示颜色设置
   */
  positiveColor: string;
  /**
   * @description Compare the indicator with the assessment attribute value of 'negative'. The color Settings are displayed
   * @description.zh-CN 对比类指标，对应 assessment 属性值为 'negative' 显示颜色设置
   */
  negativeColor: string;
}>;

export type ThemeStylesProps = {
  /**
   * @description size of text
   * @description.zh-CN 文本大小
   * @default 'normal'
   */
  size?: SizeType;
  /**
   * @description theme
   * @description.zh-CN 主题颜色
   * @default 'light'
   */
  theme?: ThemeType;
  /**
   * @description theme palette
   * @description.zh-CN 主题色板
   */
  palette?: Partial<Record<ThemeType, Partial<Record<EntityType | 'text', PaletteType>>>>;
};

export type CollapseConfig = {
  /**
   * show level line
   * 是否展示连接线
   */
  showBulletsLine: boolean;
  /**
   * custom switcher icon
   * 自定义展开/折叠图标
   */
  switcherIcon: (collapsed: boolean) => ReactNode;
  /**
   * controlled collapsed keys
   * 收起 key 受控
   */
  collapsedKeys?: string[];
  /**
   * collapse key change event
   * 收起事件
   */
  onCollapsed?: (
    collapsedKeys: string[]
    // TODO 其他参数视情况添加
    // info: {
    //   node: ParagraphSpec;
    //   expanded: boolean;
    //   nativeEvent: MouseEvent;
    // }
  ) => void;
};

export type ExtensionProps = {
  /**
   * @description extension plugin
   * @description.zh-CN 扩展插件
   */
  pluginManager?: PluginManager;
  /**
   * Paragraph collapsible configuration
   * 是否允许收起
   */
  showCollapse?: boolean | Partial<CollapseConfig>;
};

export type PhraseEvents = Partial<{
  onClickPhrase: (spec: PhraseSpec) => void;
  onMouseEnterPhrase: (spec: PhraseSpec) => void;
  onMouseLeavePhrase: (spec: PhraseSpec) => void;
}>;

type NormalParagraphSpec = HeadlineSpec | ParagraphSpec | BulletItemSpec;
export type ParagraphEvents = PhraseEvents &
  Partial<{
    onClickParagraph: (spec: NormalParagraphSpec) => void;
    onMouseEnterParagraph: (spec: NormalParagraphSpec) => void;
    onMouseLeaveParagraph: (spec: NormalParagraphSpec) => void;
  }>;

export type SectionEvents = ParagraphEvents &
  Partial<{
    onClickSection: (spec: SectionSpec) => void;
    onMouseEnterSection: (spec: SectionSpec) => void;
    onMouseLeaveSection: (spec: SectionSpec) => void;
  }>;

export type NarrativeEvents = SectionEvents &
  Partial<{
    onClickNarrative: (spec: NarrativeTextSpec) => void;
    onMouseEnterNarrative: (spec: NarrativeTextSpec) => void;
    onMouseLeaveNarrative: (spec: NarrativeTextSpec) => void;
    onCopySuccess: (e?: ClipboardEvent) => void;
    onCopyFailure: (e?: ClipboardEvent) => void;
  }>;

export type NarrativeTextVisProps = ThemeStylesProps &
  ExtensionProps &
  NarrativeEvents & {
    /**
     * @description specification of narrative text spec
     * @description.zh-CN Narrative 描述 json 信息
     */
    spec: NarrativeTextSpec;
    /**
     * @description the function to be called when copy event is listened. If it is undefined, the default behavior is to put the transformed html and plain text into user's clipboard
     * @description.监听到 copy 事件时执行的函数，可用于控制复制的内容和复制行为，如果不传，默认将会把转换后的富文本和纯文本内容放入剪切板；如果为 null 则执行浏览器默认行为
     */
    copyNarrative?: null | ((content: { spec: NarrativeTextSpec; plainText: string; html: string }) => void);
  };
