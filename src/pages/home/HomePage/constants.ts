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
    title: 'React',
    level: 'Advanced',
    description: 'Modern hooks, state management with Redux/Zustand, and performance optimization.',
    percent: 95,
    strokeFrom: '#8b5cf6',
    strokeTo: '#6366f1',
    Icon: BlockOutlined,
  },
  {
    key: 'typescript',
    themeKey: 'ts',
    title: 'TypeScript',
    level: 'Expert',
    description: 'Type-safe development, generic patterns, and interface-driven architectural design.',
    percent: 90,
    strokeFrom: '#38bdf8',
    strokeTo: '#14b8a6',
    Icon: VerifiedOutlined,
  },
  {
    key: 'tailwind',
    themeKey: 'tailwind',
    title: 'Tailwind CSS',
    level: 'Master',
    description: 'Complex layouts, custom design systems, and utility-first styling at scale.',
    percent: 98,
    strokeFrom: '#fb923c',
    strokeTo: '#f97316',
    Icon: BgColorsOutlined,
  },
  {
    key: 'vanilla',
    themeKey: 'js',
    title: 'JavaScript (Vanilla)',
    level: 'Core',
    description: 'ES6+, asynchronous programming, DOM manipulation, and functional logic.',
    percent: 95,
    strokeFrom: '#7dd3fc',
    strokeTo: '#38bdf8',
    Icon: ConsoleSqlOutlined,
  },
  {
    key: 'htmlcss',
    themeKey: 'html',
    title: 'HTML & CSS',
    level: 'Expert',
    description: 'Semantic markup, CSS Grid/Flexbox, animations, and responsive architecture.',
    percent: 98,
    strokeFrom: '#c084fc',
    strokeTo: '#a855f7',
    Icon: LayoutOutlined,
  },
  {
    key: 'design',
    themeKey: 'design',
    title: 'Design Systems',
    level: 'Creative',
    description: 'Figma to code workflows, component documentation, and brand integrity.',
    percent: 85,
    strokeFrom: '#fcd9a8',
    strokeTo: '#fdba74',
    Icon: HighlightOutlined,
  },
]

