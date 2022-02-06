import styles from '../styles/Tabs.module.css'

export const TabGroup = (props: any) => {
  return (
    <div className={styles.tabs}>
      {props.children.map((tab: any, idx: number) => {
        return (
          <Tab key={idx} name={props.name} id={tab.props.id} idx={idx} label={tab.props.label} children={tab.props.children}/>
        )
      })}
    </div>
  )
}

export const Tab = (props: any) => {
  return (
    <>
      <input type="radio" className={styles.tab_radio} name={props.name} id={props.id} defaultChecked={props.idx === 0} />
      <label htmlFor={props.id} className={styles.tab_label}>{ props.label }</label>

      <div className={styles.tab_content}>
        { props.children }
      </div>
    </>
  )
}