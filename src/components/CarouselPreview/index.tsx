/* eslint-disable jsx-a11y/alt-text */
import styled from './CarouselPreview.module.scss'
import { ReactComponent as DefaultPhoto } from "./DefaultPhoto.svg"

const CarouselPreview = () => {
  return (
    <div className={styled.wrapper}>
      <DefaultPhoto className={styled.default} />
      <DefaultPhoto className={styled.default} />
      <DefaultPhoto className={styled.default} />
      <DefaultPhoto className={styled.default} />
      <DefaultPhoto className={styled.default} />
    </div>
  )
}

export default CarouselPreview