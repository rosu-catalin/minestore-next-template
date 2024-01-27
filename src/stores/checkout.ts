import { appSettings } from "@/settings"
import { TCheckoutRequest } from "@/types/requests/checkout"
import { create } from "zustand"

type CheckoutStore = {
   details: TCheckoutRequest["details"],
   setDetails(details: TCheckoutRequest["details"]): void
   paymentMethod: string
   setPaymentMethod(paymentMethod: string): void
   acceptTerms: boolean
   setAcceptTerms(acceptTerms: boolean): void
   acceptPrivacy: boolean
   setAcceptPrivacy(acceptPrivacy: boolean): void
   referral: string,
   setReferral(referral: string): void
   vars: Array<{
      varId: number
      itemCId: number
      value: string
   }>
   setVars(vars: Array<{
      varId: number
      itemCId: number
      value: string
   }>): void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
   details: {
      fullname: "",
      email: "",
      address1: "",
      city: "",
      country: "",
      region: "",
      zipcode: ""
   },
   setDetails: (details) => set({ details }),
   paymentMethod: appSettings.defaultPaymentMethod,
   setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
   acceptTerms: false,
   setAcceptTerms: (acceptTerms) => set({ acceptTerms }),
   acceptPrivacy: false,
   setAcceptPrivacy: (acceptPrivacy) => set({ acceptPrivacy }),
   referral: "",
   setReferral: (referral) => set({ referral }),
   vars: [],
   setVars: (vars) => set({ vars }),
}))
