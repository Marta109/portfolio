export type TechItem = {
  key: string
  name: string
  slug: string
  color: string
}

export const TECH_STACK: TechItem[] = [
  {key: 'react', name: 'React', slug: 'react', color: '#61DAFB'},
  {key: 'typescript', name: 'TypeScript', slug: 'typescript', color: '#3178C6'},
  {key: 'javascript', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E'},
  {key: 'html5', name: 'HTML5', slug: 'html5', color: '#E34F26'},
  {key: 'css3', name: 'CSS3', slug: 'css', color: '#1572B6'},
  {key: 'nodejs', name: 'Node.js', slug: 'nodedotjs', color: '#339933'},
  {key: 'vite', name: 'Vite', slug: 'vite', color: '#646CFF'},
  {key: 'webpack', name: 'Webpack', slug: 'webpack', color: '#8DD6F9'},
  {key: 'git', name: 'Git', slug: 'git', color: '#F05032'},
  {key: 'github', name: 'GitHub', slug: 'github', color: '#ffffff'},
  {key: 'eslint', name: 'ESLint', slug: 'eslint', color: '#4B32C3'},
  {key: 'prettier', name: 'Prettier', slug: 'prettier', color: '#F7B93E'},
  {key: 'bootstrap', name: 'Bootstrap', slug: 'bootstrap', color: '#7952B3'},
  {key: 'mui', name: 'Material UI', slug: 'mui', color: '#007FFF'},
  {key: 'antd', name: 'Ant Design', slug: 'antdesign', color: '#0170FE'},
  {key: 'figma', name: 'Figma', slug: 'figma', color: '#F24E1E'},
]

export function techIconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`
}
