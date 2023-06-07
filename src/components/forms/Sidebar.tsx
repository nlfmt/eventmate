import Link from "next/link"
import c from "./Sidebar.module.scss"
import { AddCircleOutlineRounded, HomeRounded, InboxRounded } from "@mui/icons-material"

const Sidebar = () => {
  
  return (
    <div className={c.sidebar}>
      <header>EventMate</header>
      <nav className={c.link}>
        <Link className={c.color} href="#"><HomeRounded /><span>Home</span></Link>
        <Link className={c.color} href="#"><InboxRounded /><span>Invitations</span></Link>
        <Link className={c.greenBtn} href="#"><AddCircleOutlineRounded /><span>Create Event</span></Link>
      </nav>
      <p className={c.welcome}>Welcome Back,<br/><span className={c.userName}>Antonia</span></p>
    </div>
  )
}

export default Sidebar;
