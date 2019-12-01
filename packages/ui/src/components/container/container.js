/** @jsx h */
import { h } from 'preact'
import styles from './container.scss'

export function Container ({ extraSmall, small, medium, large, ...rest }) {
  return (
    <div
      {...rest}
      class={
        (extraSmall === true ? styles.extraSmall : null) ||
        (small === true ? styles.small : null) ||
        (medium === true ? styles.medium : null) ||
        (large === true ? styles.large : null)
      }
    />
  )
}
