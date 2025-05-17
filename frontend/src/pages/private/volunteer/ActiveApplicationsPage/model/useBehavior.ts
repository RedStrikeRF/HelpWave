import { useState } from "react"

export const useBehavior = () => {
  const [applicationList, setApplicationList] = useState();
  
  return {
    applicationList
  }
}