import { signIn } from "@/auth"
// import {Button} from "@/components/ui/button"
export default function ResendSignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Resend</button>
    </form>
  )
}