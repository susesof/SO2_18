# PROYECTO Sistemas Operativos 2 2024

## Manejo de Memoria

**Estudiante:** Josseline Suseth Godinez Garcia  
**Carnet:** 201503841
**Estudiante:** José Diego Perez Toralla  
**Carnet:** 201504081

## Objetivos

- Entender cómo funcionan el manejo de memoria en Linux. 
- Comprender como funcionan las solicitudes de memoria de los procesos. 
- Realizar reportes sobre la utilización de memoria. 

## Descripción
La gestión de la memoria es un aspecto crítico del rendimiento del sistema, ya que garantiza la  utilización eficiente de los recursos y mantiene la estabilidad bajo diferentes cargas de trabajo. Al monitorear exhaustivamente la memoria, se puede obtener información valiosa sobre el  comportamiento de su sistema, identificar posibles cuellos de botella y optimizar la asignación de recursos. En este proyecto se creara una aplicación capaz de monitorear el uso de memoria de cada proceso abierto en Linux, detectando las solicitudes de memoria que estos realizan al sistema operativo.

## Uso de la librería pthread
pthread es una biblioteca de hilos en el estándar POSIX que permite el desarrollo de aplicaciones multihilo en C. La hemos utilizado para:

- Crear hilos con pthread_create.
- Sincronizar hilos con pthread_join, esperando que los hilos finalicen su ejecución.
- Usar mutexes con pthread_mutex_init, pthread_mutex_lock, y pthread_mutex_unlock para proteger la integridad de los recursos compartidos.
- Terminar hilos con pthread_exit para salir de un hilo sin afectar a los demás hilos en ejecución.


## BD EN MYSQL 
Se almacena como mínimo la siguiente información en la bd:
• PID del proceso. 
• Nombre del proceso. 
• Llamada. 
• Tamaño del segmento de memoria solicitado o liberado. 
• Fecha y hora de la solicitud.


## API de Procesos
La API de procesos está configurada para manejar solicitudes HTTP y devolver datos relacionados con los procesos. Un endpoint específico (/api/ObtenerProcesos) ejecuta la consulta SQL para agrupar y ordenar los procesos por uso de memoria elaborada en nodejs.


## Dashboard 
En este dashboard se puede ver una tabla donde se podrá leer: 
- PID del proceso. 
- Nombre del proceso. 
- Cantidad de memoria que posee el proceso (mmap – munmap). 
- Porcentaje al que equivale la memoria del proceso a la memoria total del sistema.
- Así mismo una gráfica de pie donde se muestra que porcentaje de toda la memoria solicitada fue realizada por cada proceso.
- Por último, se incluyo una tabla donde se listan todas las llamadas solicitudes realizadas. 
![Dashboard](dashboard/src/dashboard.jpg)

Desarrollado en React.
