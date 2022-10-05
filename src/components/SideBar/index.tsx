import styled from "./SideBar.module.scss"
import ActiveLink from "./ActiveLink"
import { auth } from "../../firebase"
import logo from "./logo.png"
import { LayoutDashboard, BuildingHospital, Settings, Logout } from "tabler-icons-react"

export default function SideBar() {
  return (
    <div className={styled.wrapper}>
      <div className={styled.brand}>
        <img src={logo} alt="logo" width={60} height={60} />
      </div>
      <div className={styled.menu}>
        <ul className={styled.outer}>
          <li className={styled.item}>
            <ActiveLink to="/cms/home">
              <span className={styled.icon}>
                <LayoutDashboard size={20} strokeWidth={1.5} stroke="currentColor" />
              </span>
              <span className={styled.text}>首頁</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/cosmetic-clinic">
              <span className={styled.icon}>
                <BuildingHospital size={20} strokeWidth={1.5} stroke="currentColor" />
              </span>
              <span className={styled.text}>診所</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/system-settings">
              <span className={styled.icon}>
                <Settings size={20} strokeWidth={1.5} stroke="currentColor" />
              </span>
              <span className={styled.text}>系統</span>
            </ActiveLink>
          </li>
          <li className={styled.item} onClick={() => auth.signOut()}>
            <a href="">
              <span className={styled.icon}>
                <Logout size={20} strokeWidth={1.5} stroke="currentColor" />
              </span>
              <span className={styled.text}>登出</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
