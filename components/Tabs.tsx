import { useRouter } from 'next/router'
import styles from '../styles/Tabs.module.css'

export const TabGroup = (props: any) => {
  const router = useRouter();
  const defaultTab: any = Number(router.query.tab) || 0;

  return (
    <div className={styles.tabs}>
      {props.children.map((tab: any, idx: number) => {
        return (
          <Tab key={idx} name={props.name} id={tab.props.id} idx={idx} label={tab.props.label} defaultTab={defaultTab}
          children={tab.props.children}/>
        )
      })}
    </div>
  )
}

export const Tab = (props: any) => {
  return (
    <>
      <input type="radio" className={styles.tab_radio} name={props.name} id={props.id} 
      defaultChecked={props.idx === props.defaultTab} />
      <label htmlFor={props.id} className={styles.tab_label}>{ props.label }</label>

      <div className={styles.tab_content}>
        { props.children }
      </div>
    </>
  )
}