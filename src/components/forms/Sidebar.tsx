import Link from "next/link"
import c from "./Sidebar.module.scss"
import { AddCircleOutlineRounded, CalendarMonthRounded, ExploreRounded, InboxRounded, Settings } from "@mui/icons-material"

const Sidebar = () => {
  return (
    <div className={c.sidebar}>
      <header>EventMate</header>
      <nav className={c.link}>
        <Link className={c.color} href="#"><ExploreRounded /><span>Explore</span></Link>
        <Link className={c.color} href="#"><InboxRounded /><span>Invitations</span></Link>
        <Link className={c.color} href="#"><CalendarMonthRounded /><span>Calendar</span></Link>
        <Link className={c.color} href="#"><Settings /><span>Settings</span></Link>
        <Link className={c.greenBtn} href="#"><AddCircleOutlineRounded /><span>Create Event</span></Link>
      </nav>
    </div>
  )
}

export default Sidebar
