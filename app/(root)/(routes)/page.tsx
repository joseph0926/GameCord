import { getCurrentUser } from "@/actions/user";

const MainPage = async () => {
  const profile = await getCurrentUser();

  return <div>MainPage</div>;
};

export default MainPage;
