import axios from "axios";

const API =
`${import.meta.env.VITE_API_URL}/api/conversations`;

export const findConversation =
async(data)=>{

const response =
await axios.post(
`${API}/find-or-create`,
data
);

return response.data;

};