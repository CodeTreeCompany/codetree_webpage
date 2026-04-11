// src/components/ui/PrivacyPolicy.jsx
import React from 'react';
import styles from './Legal.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.termsContent}>
      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>1. Responsable del Tratamiento de Datos</h3>
        <p className={styles.termsText}>
          La presente Política de Privacidad regula el tratamiento de los datos personales recopilados a través del sitio web de CodeTree (en adelante, "la empresa"). CodeTree es responsable del uso adecuado, confidencial y seguro de la información proporcionada por los usuarios.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>2. Datos que Recopilamos</h3>
        <p className={styles.termsText}>
          A través de nuestros formularios, podemos recopilar los siguientes datos personales:
        </p>
        <ul className={styles.termsList}>
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Información relacionada con la solicitud o proyecto</li>
        </ul>
        <p className={styles.termsText}>
          No solicitamos datos sensibles ni información innecesaria para nuestros servicios.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>3. Finalidad del Uso de los Datos</h3>
        <p className={styles.termsText}>
          Los datos personales recopilados serán utilizados únicamente para las siguientes finalidades:
        </p>
        <ul className={styles.termsList}>
          <li>Contactar al usuario en respuesta a su solicitud</li>
          <li>Brindar información sobre nuestros servicios</li>
          <li>Atender consultas, cotizaciones o requerimientos específicos</li>
        </ul>
        <div className={styles.warningBox}>
          <div className={styles.warningIcon}>🔴</div>
          <div className={styles.warningContent}>
            <strong>Importante:</strong>
            <ul className={styles.warningList}>
              <li>No utilizamos los datos para campañas de marketing</li>
              <li>No enviamos publicidad no solicitada</li>
              <li>No realizamos perfiles comerciales ni automatización de marketing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>4. No Venta ni Cesión de Datos</h3>
        <p className={styles.termsText}>
          CodeTree no vende, alquila ni comparte datos personales con terceros. Los datos solo podrán ser divulgados en los siguientes casos:
        </p>
        <ul className={styles.termsList}>
          <li>Cuando sea requerido por una autoridad competente conforme a la ley</li>
          <li>Cuando sea necesario para proteger derechos legales de la empresa</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>5. Conservación de los Datos</h3>
        <p className={styles.termsText}>
          Los datos personales serán almacenados únicamente durante el tiempo necesario para cumplir con la finalidad para la cual fueron recopilados. Una vez cumplida dicha finalidad, los datos podrán ser eliminados de manera segura.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>6. Seguridad de la Información</h3>
        <p className={styles.termsText}>
          CodeTree implementa medidas técnicas y organizativas razonables para proteger los datos personales contra:
        </p>
        <ul className={styles.termsList}>
          <li>Acceso no autorizado</li>
          <li>Pérdida o destrucción</li>
          <li>Alteración indebida</li>
        </ul>
        <p className={styles.termsText}>
          Sin embargo, ningún sistema es completamente seguro, por lo que no se puede garantizar seguridad absoluta.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>7. Derechos del Usuario</h3>
        <p className={styles.termsText}>
          El usuario tiene derecho a:
        </p>
        <ul className={styles.termsList}>
          <li>Solicitar acceso a sus datos personales</li>
          <li>Solicitar corrección o actualización de sus datos</li>
          <li>Solicitar la eliminación de sus datos</li>
        </ul>
        <p className={styles.termsText}>
          Para ejercer estos derechos, puede contactar a CodeTree a través de los medios disponibles en el sitio web.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>8. Transferencia Internacional de Datos</h3>
        <p className={styles.termsText}>
          En caso de utilizar servicios tecnológicos (como hosting o correo electrónico), los datos podrían ser procesados fuera de Nicaragua. En estos casos, CodeTree se asegurará de que se mantengan estándares adecuados de protección de datos.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>9. Cambios en la Política de Privacidad</h3>
        <p className={styles.termsText}>
          CodeTree se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Las modificaciones serán publicadas en este mismo sitio web.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>10. Aceptación de la Política</h3>
        <p className={styles.termsText}>
          El uso del sitio web implica la aceptación de esta Política de Privacidad.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>11. Contacto</h3>
        <p className={styles.termsText}>
          Para consultas sobre esta Política de Privacidad o el tratamiento de sus datos personales, puede contactarnos a través de los canales oficiales disponibles en el sitio web.
        </p>
      </div>

      <div className={styles.termsFooter}>
        <p className={styles.termsUpdate}>Última actualización: Abril 2026</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;