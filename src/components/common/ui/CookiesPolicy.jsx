// src/components/ui/CookiesPolicy.jsx
import React from 'react';
import styles from './Legal.module.css';

const CookiesPolicy = () => {
  return (
    <div className={styles.termsContent}>
      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>1. ¿Qué son las cookies?</h3>
        <p className={styles.termsText}>
          Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario al visitar un sitio web. Estas permiten que el sitio funcione correctamente y mejoran la experiencia de navegación.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>2. Tipo de cookies que utilizamos</h3>
        <p className={styles.termsText}>
          En el sitio web de CodeTree, utilizamos únicamente cookies estrictamente necesarias, las cuales son esenciales para el funcionamiento básico del sitio. Estas cookies pueden incluir:
        </p>
        <ul className={styles.termsList}>
          <li>Gestión de sesiones de usuario</li>
          <li>Seguridad del sitio web</li>
          <li>Funcionamiento de formularios</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>3. Cookies que NO utilizamos</h3>
        <p className={styles.termsText}>
          Para garantizar la privacidad de nuestros usuarios:
        </p>
        <div className={styles.cookiesWarningBox}>
          <ul className={styles.cookiesWarningList}>
            <li>🚫 No utilizamos cookies de publicidad</li>
            <li>🚫 No utilizamos cookies de seguimiento o rastreo</li>
            <li>🚫 No utilizamos cookies de análisis con fines comerciales</li>
            <li>🚫 No realizamos perfiles de comportamiento</li>
          </ul>
        </div>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>4. Finalidad de las cookies</h3>
        <p className={styles.termsText}>
          Las cookies que utilizamos tienen como única finalidad:
        </p>
        <ul className={styles.termsList}>
          <li>Permitir el correcto funcionamiento del sitio web</li>
          <li>Garantizar una navegación segura</li>
          <li>Facilitar el uso de formularios de contacto</li>
        </ul>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>5. Gestión de cookies por el usuario</h3>
        <p className={styles.termsText}>
          El usuario puede configurar su navegador para:
        </p>
        <ul className={styles.termsList}>
          <li>Bloquear cookies</li>
          <li>Eliminar cookies almacenadas</li>
          <li>Recibir notificaciones antes de que se almacenen</li>
        </ul>
        <p className={styles.termsText}>
          Sin embargo, deshabilitar cookies esenciales puede afectar el funcionamiento del sitio web.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>6. Cookies de terceros</h3>
        <p className={styles.termsText}>
          Actualmente, CodeTree no utiliza cookies de terceros. En caso de que en el futuro se integren servicios externos (por ejemplo, mapas, videos o herramientas), esta política será actualizada para reflejar dichos cambios.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>7. Actualizaciones de la Política de Cookies</h3>
        <p className={styles.termsText}>
          CodeTree se reserva el derecho de modificar esta Política de Cookies en cualquier momento. Cualquier cambio será publicado en este sitio web.
        </p>
      </div>

      <div className={styles.termsSection}>
        <h3 className={styles.termsTitle}>8. Aceptación de la Política</h3>
        <p className={styles.termsText}>
          Al continuar navegando en el sitio web, el usuario acepta el uso de cookies conforme a esta política.
        </p>
      </div>

      <div className={styles.termsFooter}>
        <p className={styles.termsUpdate}>Última actualización: Abril 2026</p>
      </div>
    </div>
  );
};

export default CookiesPolicy;