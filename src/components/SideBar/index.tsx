import styled from "./SideBar.module.scss"
import ActiveLink from "./ActiveLink"
export default function SideBar() {
  return (
    <div className={styled.wrapper}>
      <div className={styled.menu}>
        <ul className={styled.outer}>
          <li className={styled.item}>
            <ActiveLink to="/cms/home">
              <span>首頁</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/cosmetic-clinic">
              <span>診所</span>
            </ActiveLink>
          </li>
          <li className={styled.item}>
            <ActiveLink to="/cms/system-settings">
              <span>系統</span>
            </ActiveLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
