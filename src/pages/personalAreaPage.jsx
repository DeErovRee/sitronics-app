import { auth } from "../firebase/firebase";

export const PersonalAreaPage = () => {
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Personal Area Page</h1>
      <button onClick={logout}>ВЫЙТИ</button>
    </>
  );
};
