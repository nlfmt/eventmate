import Link from "next/link"
import c from "./MenuBar.module.scss"
import { MenuRounded, SearchRounded } from "@mui/icons-material"

const MenuBar = () => {
  return (
    <div className={c.menuBar}>
      <header>
        <MenuRounded className={c.svgMenu} />
        <span>EventMate</span>
        <SearchRounded className={c.svgSearch} />
      </header>
    </div>
  )
}

export default MenuBar