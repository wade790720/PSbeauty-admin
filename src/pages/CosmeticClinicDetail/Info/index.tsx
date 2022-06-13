import styled from "./Info.module.scss"

const Info = () => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.block}>
        <div className={styled.title}>回覆數</div>
        <div className={styled.content}>38筆</div>
      </div>
      <div className={styled.block}>
        <div className={styled.title}>上傳組數/付費組數</div>
        <div className={styled.content}>10/30</div>
      </div>
      <div className={styled.block}>
        <div className={styled.title}>最後付款日期</div>
        <div className={styled.content}>2022/04/17</div>
      </div>
    </div>
  )
}

export default Info
