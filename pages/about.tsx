import { NextPage } from "next";
import styles from '../styles/about.module.css'

const About: NextPage = () => {
  return (
    <div>
      <h2>Welcome to my Blog Demo!</h2>

      <p className={styles.text}>
        This is an app I made as a demo project to showcase on my <a className="link" href="#">portfolio</a> and 
        as a tool to improve my web development skills. <br/><br/>
        This app was made by 
        following <a className="link" href="https://fireship.io/courses/react-next-firebase/">this course</a> by <a className="link" href="https://twitter.com/fireship_dev">@fireship_dev</a> however
        I did make quite a lot of changes to challenge myself and set my site apart. 
        For comparison, <a className="link" href="#">this</a> is the site from the course. I added many extra features such as:
      </p>

      <ul className={styles.text}>
        <li>Likes and Dislikes</li>
        <li>Comments</li>
        <li>Light and Dark Mode</li>
        <li>Rich Text Editor</li>
        <li>Profile Editing</li>
        <li>Search Posts</li>
        <li>Filter Posts</li>
      </ul>

      <p className={styles.text}>
        You can also look at my <a className="link" href="#">portfolio</a> for more demo projects. Find my social media below:
      </p>
    </div>
  )
}

export default About