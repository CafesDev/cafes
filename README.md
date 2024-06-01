# dev-back-cafes

# Mi Proyecto Express

Este es un proyecto Express básico que muestra cómo empezar con Express y Node.js.

## Tecnologias utilizadas
- Node JS
- Express
- Sequelize
- MySQL

## Instalación

Antes de ejecutar este proyecto, asegúrate de tener Node.js y npm instalados en tu sistema. Si no los tienes instalados, puedes seguir los siguientes pasos:

### Instalación de Node.js y npm en Windows

1. Ve al [sitio oficial de Node.js](https://nodejs.org/).
2. Descarga el instalador para Windows.
3. Ejecuta el instalador y sigue las instrucciones del asistente de instalación.

Para verificar si Node.js y npm se han instalado correctamente, abre tu terminal y ejecuta los siguientes comandos:

```bash
node --version
npm --version
```

## Servidor MySQL para desarrollo

*Necesitas Docker instalado*
#### Credenciales para MySQL
    Usuario: root
    Contraseña: 12345

#### Instalación
1. Ejecuta el siguiente comando en terminal para correr un contenedor con la imagen personalizada de MySQL
    ```bash 
    docker run --name cafes_db -p 3306:3306 -d octaviozenil/cafes_db:3.0
    ```
2. Revisa si el contenedor está corriendo
    ```bash
    docker ps
    ```
3. Ejecuta una terminal dentro del contenedor para revisar su funcionamiento
    ```bash
   docker exec -it cafes_db /bin/bash
    ```
4. Inicia sesión en mysql con las credenciales
    ```bash
    mysql -u root -p
    ```
5. Revisa si se encuentra la base de datos "cafes" y si se encuentran las tablas:
    - colaboradres
    - tipos_colaborador
    - licenciaturas
    - solicitantes
    - solicitudes

6. Ya te puedes conectar al servidor por localhost:3306 o 127.0.0.1:3306