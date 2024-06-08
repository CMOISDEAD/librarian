import toast, { Toast as IToast, resolveValue } from 'react-hot-toast'
import { RxCheck, RxCross2 } from 'react-icons/rx'
import { Spinner } from '@nextui-org/react'

export const Toast = ({ t }: { t: IToast }) => {
  return (
    <div
      className={`flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-foreground bg-background/80 divide-x rtl:divide-x-reverse divide-divider rounded-lg shadow backdrop-blur cursor-pointer ${t.visible ? 'animate-appearance-in' : 'animate-appearance-out'}`}
      onClick={() => toast.dismiss(t.id)}
    >
      {t.type === 'success' ? (
        <RxCheck className="text-success" />
      ) : t.type === 'error' ? (
        <RxCross2 className="text-danger" />
      ) : (
        <Spinner size="sm" color="primary" />
      )}
      <div className="ps-4 text-sm font-normal">{resolveValue(t.message, t)}</div>
    </div>
  )
}
