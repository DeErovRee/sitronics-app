import { Sidebar } from "./personalPageComponent/sidebar";
import { OptionalWindow } from "./personalPageComponent/optionalWindow";

export const PersonalAreaPage = () => {

  return (
    <>
      <h1 style={{textAlign: 'center', margin: '57px 0 97px'}}>Личный кабинет</h1>
      <div className="personalArea">
        <Sidebar />
        <OptionalWindow />
      </div>
    </>
  );
};
