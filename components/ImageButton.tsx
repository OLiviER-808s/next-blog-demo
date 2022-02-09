import Image from "next/image";
import { useRef } from "react";
import styles from '../styles/ImageButton.module.css'

const ImageButton = (props: any) => {
  const imageUpload: any = useRef(null);

  const handleClick = (e: any) => {
    imageUpload.current.click();
  }

  const handleChange = (e: any) => {
    props.handleFile(e.target.files[0]);
  }

  return (
    <>
      <input type="file" hidden ref={imageUpload} onChange={handleChange}/>

      <button className={`${styles.btn} ${styles[props.color]}`} onClick={handleClick}>
        <Image src={props.src} width={40} height={40}/>
        
        <div className={styles.container}>
          { props.children }
        </div>
      </button>
    </>
  )
}

export default ImageButton;