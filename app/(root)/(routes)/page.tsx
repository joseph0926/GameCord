import { getCurrentUser } from "@/actions/user";

const MainPage = async () => {
  const profile = await getCurrentUser();
  console.log(profile, "Asdas");

  return <div>MainPage</div>;
};

export default MainPage;
