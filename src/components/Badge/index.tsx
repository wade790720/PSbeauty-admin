import cx from "classnames"
import styled from "./Badge.module.scss"

const VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  IMPORTANT: 'important',
} as const;

export type BadgeProps = {
  /**
   * Specify the type of the
   */
  variant?: typeof VARIANT[keyof typeof VARIANT]
  /**
   * Specify if the is circle 
   */
  pill?: boolean
} & ReactProps.Component

 const Badge = ({
  variant = "primary",
  pill = false,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cx(styled.wrapper, styled[variant], { [styled.pill]: pill }, className)}
      {...props}>
      {children}
    </span>
  )
}

export default Badge

