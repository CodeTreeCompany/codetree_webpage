// src/components/ui/TermsAndConditions.jsx
import React from 'react';
import styles from './Legal.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContent}>
      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>1. Información General</h3>
        <p className={styles.termsText}>
          Bienvenido al sitio web de CodeTree. Al acceder y utilizar este sitio web, usted acepta cumplir con los presentes Términos y Condiciones, así como con todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, le recomendamos no utilizar este sitio.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>2. Objeto del Sitio Web</h3>
        <p className={styles.termsText}>
          El presente sitio web tiene como finalidad proporcionar información sobre los servicios tecnológicos ofrecidos por CodeTree, incluyendo desarrollo de software, automatización, inteligencia artificial y soluciones SaaS, así como facilitar el contacto y solicitud de cotizaciones por parte de los usuarios.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>3. Uso del Sitio Web</h3>
        <p className={styles.termsText}>
          El usuario se compromete a utilizar el sitio web de manera adecuada y a no realizar actividades que puedan:
        </p>
        <ul className={styles.termsList}>
          <li>Dañar, sobrecargar o deteriorar el funcionamiento del sitio</li>
          <li>Intentar acceder a áreas restringidas sin autorización</li>
          <li>Introducir virus o cualquier otro código malicioso</li>
          <li>Utilizar la información del sitio con fines ilícitos</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>4. Propiedad Intelectual</h3>
        <p className={styles.termsText}>
          Todos los contenidos del sitio web, incluyendo textos, diseños, logotipos, imágenes, código fuente y elementos gráficos, son propiedad de CodeTree o cuentan con licencias de uso, y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción, distribución o modificación sin autorización previa y por escrito.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>5. Servicios y Cotizaciones</h3>
        <p className={styles.termsText}>
          Los servicios ofrecidos a través del sitio web pueden variar en precio dependiendo de los requerimientos específicos de cada proyecto. Las cotizaciones generadas mediante formularios o contacto directo:
        </p>
        <ul className={styles.termsList}>
          <li>No constituyen una oferta vinculante</li>
          <li>Están sujetas a evaluación técnica</li>
          <li>Pueden modificarse según alcance, tiempo y recursos requeridos</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>6. Plataformas SaaS</h3>
        <p className={styles.termsText}>
          CodeTree puede ofrecer productos bajo el modelo SaaS (Software como Servicio), los cuales pueden incluir:
        </p>
        <ul className={styles.termsList}>
          <li>Planes de suscripción</li>
          <li>Funcionalidades específicas según el plan contratado</li>
          <li>Condiciones adicionales de uso</li>
        </ul>
        <p className={styles.termsText}>
          El uso de estos servicios estará sujeto a términos específicos que serán proporcionados al momento de la contratación.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>7. Limitación de Responsabilidad</h3>
        <p className={styles.termsText}>
          CodeTree no garantiza que el sitio web esté libre de errores o interrupciones, aunque se esfuerza por mantener su disponibilidad y correcto funcionamiento. No se responsabiliza por:
        </p>
        <ul className={styles.termsList}>
          <li>Daños derivados del uso del sitio web</li>
          <li>Pérdida de información</li>
          <li>Interrupciones del servicio</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>8. Enlaces a Terceros</h3>
        <p className={styles.termsText}>
          El sitio web puede contener enlaces a sitios externos. CodeTree no se responsabiliza por el contenido, políticas o prácticas de dichos sitios.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>9. Protección de Datos</h3>
        <p className={styles.termsText}>
          El uso de datos personales se rige por nuestra Política de Privacidad. Al utilizar el sitio, el usuario acepta el tratamiento de sus datos conforme a dicha política.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>10. Modificaciones</h3>
        <p className={styles.termsText}>
          CodeTree se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>11. Legislación Aplicable</h3>
        <p className={styles.termsText}>
          Estos Términos y Condiciones se rigen por las leyes aplicables en la jurisdicción correspondiente a la operación de CodeTree.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>12. Contacto</h3>
        <p className={styles.termsText}>
          Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos a través de los canales disponibles en el sitio web.
        </p>
      </div>

      <div className={styles.termsFooter}>
        <p className={styles.termsUpdate}>Última actualización: Abril 2026</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;