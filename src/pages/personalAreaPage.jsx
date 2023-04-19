import { Sidebar } from "./personalPageComponent/sidebar";
import { OptionalWindow } from "./personalPageComponent/optionalWindow";

export const PersonalAreaPage = () => {

  return (
    <>
      
      <div className="personalArea">
        <h1 style={{textAlign: 'center', margin: '0 0 97px', fontWeight: '500', color: 'white'}}>Личный кабинет</h1>
        <div className="personalAreaW">
          <Sidebar />
          <OptionalWindow />
        </div>
      </div>
    </>
  );
};
