import cx from "classnames"
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

type ActiveLinkProps = {
  children: React.ReactNode,
  to: string
}

const ActiveLink = ({ children, to, ...props }: ActiveLinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      className={cx({ active: match })}
      style={{ background: match ? "#253858" : "", color: match ? "#fff" : "" }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  )

};

export default ActiveLink;