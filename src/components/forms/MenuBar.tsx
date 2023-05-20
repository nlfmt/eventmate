import Link from "next/link"
import c from "./MenuBar.module.scss"
import { MenuRounded, SearchRounded } from "@mui/icons-material"

const MenuBar = () => {
  return (
    <div className={c.menuBar}>
      <header><MenuRounded className={c.svgMenu}> </MenuRounded> <span>EventMate</span> <SearchRounded className={c.svgSearch}></SearchRounded></header>
    </div>
  )
}

export default MenuBar