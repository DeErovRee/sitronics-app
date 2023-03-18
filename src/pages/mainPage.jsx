export const MainPage = () => {
  return (
    <>
    <div className="mainPage first">
      <div className="serviceName">
        <h1>Услуги аэрофотосъемки
          и видеомониторинга</h1>
      </div>
      <div className="companyImage">
        <img src={require("../images/geoscan_logo.png")} alt="geoscan_logo" />
        <img src={require("../images/albatros_logo.png")} alt="albatros_logo" />
        <img src={require("../images/drone_center_logo.png")} alt="drone_center_logo" />
        <img src={require("../images/geoscan_logo.png")} alt="geoscan_logo" />
      </div>
    </div>
    <div className="mainPage second">
      <div className="serviceName">
        <h1>Тепловизионная съемка</h1>
      </div>
      <div className="companyImage">
        <img src={require("../images/geoscan_logo.png")} alt="geoscan_logo" />
        <img src={require("../images/albatros_logo.png")} alt="albatros_logo" />
        <img src={require("../images/aerodyne_logo.png")} alt="aerodyne_logo" />
        <img src={require("../images/supercam_logo.png")} alt="supercam_logo" />
      </div>
    </div>
    <div className="mainPage third">
      <div className="serviceName">
        <h1>О компании</h1>
      </div>
      <div className="thirdDescription">
        <div className="companyDescription">
        </div>
        <div className="companyDescription">
        Группа компаний &laquo;Ситроникс&raquo;&nbsp;&mdash; российская многопрофильная ИТ-компания 
        с&nbsp;большим опытом разработки цифровых решений и&nbsp;реализации масштабных 
        проектов для бизнеса и&nbsp;правительства <br /><br /><br />
        В&nbsp;2008 году признана крупнейшей в&nbsp;России компанией высоких технологий 
        в&nbsp;рейтинге &laquo;Эксперт 400&raquo;. По&nbsp;итогам 2010 года заняла по&nbsp;объёму выручки 
        97&nbsp;место в&nbsp;рейтинге ста крупнейших высокотехнологичных компаний мира 
        (1&nbsp;место среди компаний Восточной Европы), формируемом аналитической 
        группой &laquo;ТАСС-Телеком&raquo;
        </div>
      </div>
    </div>
    
    </>
  );
};
