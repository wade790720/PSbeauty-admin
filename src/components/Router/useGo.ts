import { useNavigate } from "react-router-dom"

type toTarget = {
  /** 首頁 */
  toHome: () => void
  /** 登錄頁 */
  toLogin: () => void
  /** 註冊頁 */
  toRegister: () => void
  /** 忘記密碼頁 */
  toForgetPassword: () => void
  /** 診所 */
  toCosmeticClinicDetail: ({ id }: { id: string }) => void
  /** 用戶分群 */
  toUserGroups: () => void
  /** 建立分群 */
  toUserGroupCreate: () => void
  /** 檢視分群 */
  toUserGroup: ({ id }: { id: number }) => void
  /** 數據分析/歷史詳情/用戶清單 */
  toUserGroupsReport: ({ id, tab }: { id: string; tab?: string }) => void
  /** 分布對照/歷史詳情 */
  toUserTag: ({ labelId, tab }: { labelId?: string; tab?: string }) => void
}

const useGo = (): toTarget => {
  const navigate = useNavigate()
  return {
    toHome: () => navigate("/cms"),
    toLogin: () => navigate("/login"),
    toRegister: () => navigate("/register"),
    toForgetPassword: () => navigate("/forget-password"),
    toCosmeticClinicDetail: ({ id }) => navigate(`/cms/cosmetic-clinic/${id}`),
    toUserGroups: () => navigate("/cms/user-groups"),
    toUserGroupCreate: () => navigate("/cms/user-groups/create"),
    toUserGroup: ({ id }) => navigate(`/cms/user-groups/${id}`),
    toUserGroupsReport: ({ id, tab }) => navigate(`/cms/user-groups/${id}/report/${tab}`),
    toUserTag: ({ labelId, tab }) => navigate(`/cms/user-tag/${labelId}/${tab}`),
  }
}

export default useGo
