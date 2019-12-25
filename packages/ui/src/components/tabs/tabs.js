/** @jsx h */
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import {
  DOWN_KEY_CODE,
  ESCAPE_KEY_CODE,
  LEFT_KEY_CODE,
  RIGHT_KEY_CODE,
  UP_KEY_CODE
} from '../../utilities/key-codes'
import '../../scss/base.scss'
import styles from './tabs.scss'

export function Tabs ({
  name,
  onChange,
  options,
  propagateEscapeKeyDown = false,
  value,
  ...rest
}) {
  const handleChange = useCallback(
    function (event) {
      const index = parseInt(event.target.getAttribute('data-index'))
      onChange(options[index].value, name)
    },
    [name, onChange, options]
  )

  const handleKeyDown = useCallback(
    function (event) {
      const keyCode = event.keyCode
      if (keyCode === ESCAPE_KEY_CODE) {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        event.target.blur()
        return
      }
      if (
        keyCode === DOWN_KEY_CODE ||
        keyCode === LEFT_KEY_CODE ||
        keyCode === RIGHT_KEY_CODE ||
        keyCode === UP_KEY_CODE
      ) {
        const currentIndex = options.findIndex(function (option) {
          return option.value === value
        })
        let nextIndex =
          currentIndex +
          (keyCode === LEFT_KEY_CODE || keyCode === UP_KEY_CODE ? -1 : 1)
        if (nextIndex === -1) {
          nextIndex = options.length - 1
        }
        if (nextIndex === options.length) {
          nextIndex = 0
        }
        onChange(options[nextIndex].value, name)
      }
    },
    [name, onChange, options, propagateEscapeKeyDown, value]
  )

  const activeOption = options.find(function (option) {
    return option.value === value
  })

  return (
    <div>
      <div class={styles.tabs} onKeyDown={handleKeyDown} tabindex='1'>
        {options.map(function (option, index) {
          const text =
            typeof option.text === 'undefined' ? option.value : option.text
          return (
            <label class={styles.label} key={index}>
              <input
                {...rest}
                class={styles.input}
                type='radio'
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                data-index={index}
                tabIndex='0'
              />
              <div class={styles.text} data-text={text}>
                {text}
              </div>
            </label>
          )
        })}
      </div>
      {typeof activeOption === 'undefined' ? null : activeOption.view}
    </div>
  )
}