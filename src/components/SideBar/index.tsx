import styled from "./SideBar.module.scss"
import ActiveLink from "./ActiveLink"
import { ReactComponent as Home } from "./Home.svg"
import { ReactComponent as Clinic } from "./Clinic.svg"
import { ReactComponent as Case } from "./Case.svg"
import { ReactComponent as Settings } from "./Settings.svg"

export default function SideBar() {

  return (
    <div className={styled.wrapper}>
      <div className={styled.menu}>
        <ul className={styled.outer}>
          <li className={styled.item}>
            <ActiveLink to="/cms/home">
              <Home />
              <span>首頁</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/cosmetic-clinic">
              <Clinic />
              <span>診所</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/system-settings">
              <Settings />
              <span>系統</span>
            </ActiveLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
