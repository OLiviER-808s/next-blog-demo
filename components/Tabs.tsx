import styles from '../styles/Tabs.module.css'

export const TabGroup = (props: any) => {
  return (
    <div className={styles.tabs}>
      {props.children.map((tab: any, idx: number) => {
        return (<>
          <input type="radio" className={styles.tab_radio} name={props.name} id={tab.props.id} defaultChecked={idx === 0} />
          <label htmlFor={tab.props.id} className={styles.tab_label}>{ tab.props.label }</label>

          <div className={styles.tab_content}>
            { tab.props.children }
          </div>
        </>)
      })}
    </div>
  )
}

export const Tab = (props: any) => {
  return (
    <></>
  )
}