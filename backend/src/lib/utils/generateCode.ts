import { v4 as uuidv4 } from "uuid";

export const generateUniqueCode = () => {
 const code = uuidv4().replace(/-/g, "").substring(0, 25);
 console.log(code)
  return code;
}