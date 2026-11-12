# City Ride SV — prototipo web

Sitio web responsive inspirado en la referencia visual compartida y adaptado al concepto de transporte nocturno compartido en El Salvador.

## Archivos
- `index.html`: contenido y estructura.
- `styles.css`: diseño visual responsive.
- `script.js`: menú móvil, selector Ahora/Programar, formulario de consulta de viaje y formularios de contacto/suscripción.

## Uso
Descomprime el ZIP y abre `index.html` en un navegador. Para editarlo, abre la carpeta en Visual Studio Code y utiliza Live Server.

## Alcance de esta versión
Este es un prototipo frontend. El formulario de viaje valida los datos localmente y muestra un resumen, pero no busca vehículos, no muestra rutas reales, no calcula tarifas reales, no confirma reservas ni procesa pagos. Los formularios de contacto y suscripción tampoco envían datos a un servidor.

## Para una versión de producción
1. Backend con Node.js + Express, NestJS o Python + FastAPI.
2. Base de datos PostgreSQL para usuarios, viajes, reservas y pagos.
3. Aplicación móvil o PWA con mapas y geolocalización, con consentimiento.
4. Motor de agrupación de pasajeros por origen, destino, horario y capacidad.
5. Integración con proveedor de mapas, cálculo de rutas y tráfico.
6. Pasarela de pago autorizada para tarjetas y billeteras; QR según proveedor.
7. Verificación de conductores, documentos, vehículos, seguros, soporte y botón de emergencia.
8. Revisión legal y regulatoria en El Salvador antes de operar transporte remunerado o colectivo.

No presentar el servicio como seguro, disponible o autorizado hasta que esos procesos se implementen y verifiquen.
