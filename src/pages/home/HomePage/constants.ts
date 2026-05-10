import {
  BgColorsOutlined,
  BlockOutlined,
  ConsoleSqlOutlined,
  HighlightOutlined,
  LayoutOutlined,
  VerifiedOutlined,
} from '@ant-design/icons'
import type { ComponentType } from 'react'

export type SkillThemeKey = 'react' | 'ts' | 'tailwind' | 'js' | 'html' | 'design'

export type SkillIcon = ComponentType<{ className?: string }>

export type SkillItem = {
  key: string
  themeKey: SkillThemeKey
  title: string
  level: string
  description: string
  percent: number
  strokeFrom: string
  strokeTo: string
  Icon: SkillIcon
}

export const SKILLS: SkillItem[] = [
  {
    key: 'react',
    themeKey: 'react',
    title: 'Frameworks & Libraries',
    level: 'Advanced',
    description: 'Frameworks & Libraries: React, Node.js (basic), Bootstrap, React Bootstrap, Material UI',
    percent: 95,
    strokeFrom: '#8b5cf6',
    strokeTo: '#6366f1',
    Icon: BlockOutlined,
  },
  {
    key: 'typescript',
    themeKey: 'ts',
    title: 'Languages',
    level: 'Advanced',
    description: 'Languages: JavaScript, TypeScript, HTML5, CSS3,  C++',
    percent: 90,
    strokeFrom: '#38bdf8',
    strokeTo: '#14b8a6',
    Icon: VerifiedOutlined,
  },
  {
    key: 'tailwind',
    themeKey: 'tailwind',
    title: 'Build Tools',
    level: 'Advanced',
    description: 'Build Tools: Webpack, Vite',
    percent: 98,
    strokeFrom: '#fb923c',
    strokeTo: '#f97316',
    Icon: BgColorsOutlined,
  },
  {
    key: 'vanilla',
    themeKey: 'js',
    title: 'Code Quality',
    level: 'Core',
    description: 'Code Quality: JSHint, ESLint, Prettier',
    percent: 95,
    strokeFrom: '#7dd3fc',
    strokeTo: '#38bdf8',
    Icon: ConsoleSqlOutlined,
  },
  {
    key: 'htmlcss',
    themeKey: 'html',
    title: 'Version Control',
    level: 'Expert',
    description: 'Version Control: Git, GitHub',
    percent: 98,
    strokeFrom: '#c084fc',
    strokeTo: '#a855f7',
    Icon: LayoutOutlined,
  },
  {
    key: 'design',
    themeKey: 'design',
    title: 'Design Tools',
    level: 'Advanced',
    description: 'HTML / CSS / Figma\nNode.js / npm',
    percent: 85,
    strokeFrom: '#fcd9a8',
    strokeTo: '#fdba74',
    Icon: HighlightOutlined,
  },
]
