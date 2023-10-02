import { createUser } from "@/actions/user";

const NewUser = async () => {
  const newProfile = await createUser();
  console.log(newProfile);

  return <div>NewUser</div>;
};

export default NewUser;
