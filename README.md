# Objetivo proyecto
Esta aplicación permite visualizar a través de navio, datasets de datos.gov.co, además de mostrar un historial de las consultas hechas para poder volvr a acceder a las mismas sin necesidad de volver a ingresar manualmente la url del dataset.
(Esta entrega corresponde a la que entra en el plazo de envío del jueves 19 antes de las 8am).

# Tecnologías usadas
Para este proyecto se usó React, Express y una base de datos MongoDB almacenada en mlab.

# Autor
[Daniela Rocha Torres](https://danielarocha6.github.io)

# Despliegue
Para acceder a la aplicación de puede: ingresar a la [url en donde está desplegada](https://visual-datos-gov.herokuapp.com).

Clonar el repositorio y una vez allí ejecutar los siguientes comandos:

`cd back`

`npm i`

`cd front`

`npm i`

`cd ..`

`npm run dev`

# Screenshots
![Desplegado localmente](https://github.com/DanielaRocha6/Visualizacion-datos.gov.co/blob/master/desplegado_local)
![Desplegado en heroku](https://github.com/DanielaRocha6/Visualizacion-datos.gov.co/blob/master/desplegadoHeroku)

Accediendo a este [video](https://youtu.be/aoxqlY5ju_8) puede verse también la funcionalidad de la aplicación.
Se manejó una base de datos de mlab para la cual se tuvo que crear usuario y contraseña. Al configurar la aplicación en heroku se declararon las variables de entorno y al acceder a heroku config estas se encuentran configuradas. Sin embargo, en la página de heroku no se muestra el histórico de consultas (que requiere de mongo), pero en la versión local sí se puede ver este histórico y acceder tal cual se dice en la descripción inicial.

# Licencia MIT
Este proyecto se encuentra listado bajo la [LICENCIA MIT](https://github.com/DanielaRocha6/Visualizacion-datos.gov.co/blob/master/LICENSE)
