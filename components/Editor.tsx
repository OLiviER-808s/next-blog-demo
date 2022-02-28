import CenterIcon from '../public/icons/editor/align center.svg'
import LeftIcon from '../public/icons/editor/align left.svg'
import RightIcon from '../public/icons/editor/align right.svg'
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
import useScreenWidth from '../lib/screen-width'

const Editor = () => {
  const headerRef: any = useRef(null)
  const contentRef: any = useRef(null)
  const imageUpload: any = useRef(null)

  const isHandheld: boolean = useScreenWidth() < 600

  const insertImage = (event: any) => {
    if (event.target.files.length < 1) return

    const file: File = event.target.files[0]

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const photo: any = reader.result;
        document.execCommand('insertImage', false, photo)
      }
    }
  }

  useEffect(() => {
    const btns = headerRef.current.querySelectorAll('button')

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        const command = btns[i].dataset['element']

        if (command === 'insertImage') {
          imageUpload.current.click()
        }
        else if (command === 'createLink') {
          const link: any = prompt('Enter link here: ', '')
          document.execCommand(command, false, link)
        }
        else {
          document.execCommand(command, false)
        }
        contentRef.current.focus()
      })
    }

    return document.removeEventListener('click', () => {})
  }, [])

  return (
    <div style={{'marginBottom': '1em'}}>
      <input type="file" hidden ref={imageUpload} onChange={insertImage}/>

      <div ref={headerRef} className={styles.header}>
        <button type="button" data-element="bold" className={styles[useCommandListener('bold')]}>
          <BoldIcon />
        </button>
        <button type="button" data-element="italic" className={styles[useCommandListener('italic')]}>
          <ItalicIcon />
        </button>
        <button type="button" data-element="underline" className={styles[useCommandListener('underline')]}>
          <UnderlineIcon />
        </button>

        {!isHandheld && <div className={styles.spacer}></div>}

        <button type="button" data-element="insertUnorderedList" className={styles[useCommandListener('insertUnorderedList')]}>
          <ListIcon />
        </button>
        <button type="button" data-element="insertOrderedList" className={styles[useCommandListener('insertOrderedList')]}>
          <FormatListIcon />
        </button>

        {!isHandheld && <div className={styles.spacer}></div>}

        <button type="button" data-element="justifyLeft" className={styles[useCommandListener('justifyLeft')]}>
          <LeftIcon />
        </button>
        <button type="button" data-element="justifyCenter" className={styles[useCommandListener('justifyCenter')]}>
          <CenterIcon />
        </button>
        <button type="button" data-element="justifyRight" className={styles[useCommandListener('justifyRight')]}>
          <RightIcon />
        </button>

        {!isHandheld && <div className={styles.spacer}></div>}

        <button type="button" data-element="insertImage" className={styles[useCommandListener('insertImage')]}>
          <ImageIcon />
        </button>
        <button type="button" data-element="createLink" className={styles[useCommandListener('createLink')]}>
          <LinkIcon />
        </button>
      </div>
      
      <div id='content' ref={contentRef} className={styles.content} contentEditable></div>
    </div>
  )
}

export default Editor