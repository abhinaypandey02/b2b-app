import axiosInitialize from "./InitializeAxios";
import GenerateToken from "../functions/GenerateToken";

const RequestHomePageData = async () => {
  const token = await GenerateToken();
  const request = await axiosInitialize.post(
    `/requestInitialData`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return request.data.data;
};
export default RequestHomePageData;
