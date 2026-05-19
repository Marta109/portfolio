import type {TechItem} from '../../constants'
import {techIconUrl} from '../../constants'
import styles from './ExpertiseSection.module.css'

type TechTileProps = {
  tech: TechItem
}

export function TechTile({tech}: TechTileProps) {
  return (
    <div
      className={styles.tile}
      role="listitem"
      style={{'--accent': tech.color} as React.CSSProperties}
      title={tech.name}>
      <div className={styles.iconWrap}>
        <img
          src={techIconUrl(tech.slug, tech.color)}
          alt={tech.name}
          className={styles.icon}
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className={styles.tileName}>{tech.name}</span>
    </div>
  )
}
