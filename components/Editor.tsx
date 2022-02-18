import CenterIcon from '../public/icons/editor/align center.svg'
import LeftIcon from '../public/icons/editor/align left.svg'
import RightIcon from '../public/icons/align right.svg'
import BoldIcon from '../public/icons/editor/bold.svg'
import FormatListIcon from '../public/icons/editor/format list.svg'
import ImageIcon from '../public/icons/editor/image.svg'
import LinkIcon from '../public/icons/editor/link.svg'
import ListIcon from '../public/icons/editor/list.svg'
import ItalicIcon from '../public/icons/editor/italic.svg'
import UnderlineIcon from '../public/icons/editor/underline.svg'
import styles from '../styles/Editor.module.css'
import { useEffect, useRef } from 'react'
import { useCommandListener } from '../lib/commandListener'

const Editor = () => {
  const header: any = useRef(null)

  useEffect(() => {
    const btns = header.current.children

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        const command = btns[i].dataset['element']

        document.execCommand(command, false)
      })
    }

    return document.removeEventListener('click', () => {})
  }, [])

  return (
    <>
      <div ref={header} className={styles.header}>
        <button type="button" data-element="bold" className={styles[useCommandListener('bold')]}>
          <BoldIcon />
        </button>
        <button type="button" data-element="italic" className={styles[useCommandListener('italic')]}>
          <ItalicIcon />
        </button>
        <button type="button" data-element="underline" className={styles[useCommandListener('underline')]}>
          <UnderlineIcon />
        </button>
      </div>
      
      <div className={styles.content} contentEditable></div>
    </>
  )
}

export default Editor