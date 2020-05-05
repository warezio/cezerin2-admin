import { useEffect } from "react"
import * as auth from "../components/lib/auth"

const Logout = () => {
  useEffect(() => auth.removeToken(), [])

  return null
}

export default Logout
