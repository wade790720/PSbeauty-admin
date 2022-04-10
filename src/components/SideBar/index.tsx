import styled from "./SideBar.module.scss"
import { Link } from "react-router-dom"

export default function SideBar() {

  return (
    <div className={styled.wrapper}>
      <div className={styled.menu}>
        <ul className={styled.outer}>
          <li className={styled.item}>
            <Link to="/cms">Home</Link>
          </li>
          <li className={styled.item}>
            <Link to="/cms/cosmetic-clinic">CosmeticClinic</Link>
          </li>
          <li className={styled.item}>
            <Link to="/cms/cosmetic-case">CosmeticCase</Link>
          </li>
          <li className={styled.item}>
            <Link to="/cms/system-settings">SystemSettings</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
