import { Link } from "react-router-dom";
import {
  Title,
  Text,
  SmallText,
  GlobalText,
  SubTitle,
} from "../../atoms/TextsGlobal";
import Logo from "../../molecules/Logo";

function PrivacyPolicies() {
  return (
    <div className="w-screen h-screen flex-col items-center mx-auto flex bg-slate-100">
      <div className="h-20 w-full bg-primary-900 flex ">
        <div className="w-1/5 h-full flex justify-evenly items-center ">
          <img className="w-16 h-16" src="/images/logo.png" alt="" />
          <Title text="Softion Pro" color={"white"} />
        </div>
        <div className=" w-4/5 flex justify-end items-center">
          <Link
            to="/App"
            className="text-white h-12 flex items-center px-10 bg-slate-800 "
          >
            Regresar
          </Link>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 w-10/12 h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white shadow-xl ">
          <div className=" w-full flex justify-center items-ce ter  ">
            <Title text="Políticas de Privacidad" color={"black"} />
          </div>
          <div className="w-full flex flex-col max-h-[calc(100vh-180px)] overflow-auto  ">
            <GlobalText  color='black text-xl my-5' text="Administradora de Comercios y Franquicias , mejor conocido como Administradora de Comercios y Franquicias , con domicilio en calle Rayón Oriente No. 303-8 Plaza Robert, colonia Centro, ciudad México, municipio o delegación Tulancingo de Bravo, c.p. 43600, en la entidad de Hidalgo, país México , y portal de internet l.aguilar@gruporoma.com , es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:" />
            <GlobalText text="¿Para qué fines utilizaremos sus datos personales? Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:" />
            <GlobalText text="De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:" />
            <GlobalText text="Cumplimiento de normativas y políticas internas" />
            <GlobalText text="Cumplimiento de obligaciones legales" />
            <GlobalText text="para verificar su identidad" />
            <GlobalText text="No consiento que mis datos personales se utilicen para estos fines: Cumplimiento de normativas y políticas internas Cumplimiento de obligaciones legales para verificar su identidad" />
            <GlobalText text="¿Qué datos personales utilizaremos para estos fines?" />
            <ul className="list-disc list-inside">
                <li> Nombre </li>
                <li><GlobalText text="Correo electrónico" /> Correo Electrónico</li>
                <li><GlobalText text="Firma electrónica" /></li>
            </ul>
            <GlobalText text="¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?" />
            <GlobalText text="Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para estas finalidades específicas (Oposición). Estos derechos se conocen como derechos ARCO." />
            <GlobalText text="Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del siguiente medio:" />
            <GlobalText text="Acceso, Rectificación, Cancelación" />
            <GlobalText text="Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO, ponemos a su disposición el siguiente medio:" />
            <GlobalText text="Avisos de Privacidad, Sitio web, Atención al cliente" />
            <GlobalText text="Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las solicitudes de derechos ARCO, son los siguientes:" />
            <GlobalText text="a) Nombre de la persona o departamento de datos personales: Responsable de Privacidad" />
            <GlobalText text="b) Domicilio: calle Rayón Oriente No. 303-8 Plaza Robert, colonia Centro, ciudad México, municipio o delegación Tulancingo de Bravo, c.p. 43600, en la entidad de Hidalgo, país México" />
            <GlobalText text="Usted puede revocar su consentimiento para el uso de sus datos personales" />
            <GlobalText text="Para revocar su consentimiento deberá presentar su solicitud a través del siguiente medio:" />
            <GlobalText text="Avisos de privacidad" />
            <GlobalText text="Para conocer el procedimiento y requisitos para la revocación del consentimiento, ponemos a su disposición el siguiente medio:" />
            <GlobalText text="Avisos de privacidad" />
            <GlobalText text="¿Cómo puede limitar el uso o divulgación de su información personal?" />
            <GlobalText text="Con objeto de que usted pueda limitar el uso y divulgación de su información personal, le ofrecemos los siguientes medios:" />
            <GlobalText text="Configuración de notificaciones y preferencias, avisos de privacidad" />
            <GlobalText text="Asimismo, usted se podrá inscribir a los siguientes registros, en caso de que no desee obtener publicidad de nuestra parte:" />
            <GlobalText text="Registro Público para Evitar Publicidad, para mayor información consulte el portal de internet de la PROFECO" />
            <GlobalText text="El uso de tecnologías de rastreo en nuestro portal de internet" />
            <GlobalText text="Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que recabamos a través de estas tecnologías, los utilizaremos para los siguientes fines:" />
            <GlobalText text="Seguridad" />
            <GlobalText text="Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:" />
            <GlobalText text="Identificadores, nombre de usuario y contraseñas de una sesión" />
            <GlobalText text="Tipo de navegador del usuario" />
            <GlobalText text="Tipo de sistema operativo del usuario" />
            <GlobalText text="Páginas web visitadas por un usuario" />
            <GlobalText text="¿Cómo puede conocer los cambios en este aviso de privacidad?" />
            <GlobalText text="El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas." />
            <GlobalText text="Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de:" />
            <GlobalText text="correo electrónico" />
            <GlobalText text="Su consentimiento para el tratamiento de sus datos personales" />
            <GlobalText text="Consiento que mis datos personales sean tratados de conformidad con los términos y condiciones informados en el presente aviso de privacidad" />
            <GlobalText text="Política de Cookies" />
            <SubTitle text="Definiciones y términos clave" />
            <GlobalText text="Para ayudar a explicar las cosas de la manera más clara posible en esta Política de cookies, cada vez que se cumpla alguno de estos términos están referenciados, se definen estrictamente como:" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicies;
