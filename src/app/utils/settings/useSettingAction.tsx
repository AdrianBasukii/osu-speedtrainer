import { useActionState, useEffect } from "react"
import { toastFunc } from "@/app/components/Layout/Toast"

type ActionResponse = {
  success: boolean
  message: string
} | undefined | null

export function useSettingAction<T extends ActionResponse>(
    actionFn: (_prevState: T | null, formData: FormData) => Promise<T>,
    successId: string,
    errorId: string,
    onSuccess: (value: string)=>void
){
    const [state, formAction] = useActionState(actionFn, null)

    useEffect(() => {

        if(!state) return

        if (!state.success){
            toastFunc("error", state.message, errorId)

        } else{
            toastFunc("success", state.message, successId)
            onSuccess("none")
        }
    }, [state])

    return { formAction, state }
}