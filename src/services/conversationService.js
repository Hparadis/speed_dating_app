import axios from "axios";

const API =
"http://localhost:5000/api/conversations";

export const findConversation =
async(data)=>{

const response =
await axios.post(
`${API}/find-or-create`,
data
);

return response.data;

};