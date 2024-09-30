# Metodología para el desarrollo de software: Scrum

Para el desarrollo de la aplicación web progresiva (PWA) que permitirá la gestión de proyectos y tareas, se ha optado por la metodología Scrum. Esta decisión se basa en las características particulares del proyecto, que involucra la creación de una herramienta flexible y adaptable para la asignación de tareas, la gestión de fechas límite, responsables y miembros del equipo, con la posibilidad de visualizar las tareas en formato de lista y tablero Kanban.

Scrum es una metodología ágil, enfocada en la entrega incremental y la capacidad de adaptación a los cambios, lo cual es esencial en el contexto del desarrollo de una PWA. Dado que los requisitos del usuario pueden evolucionar con el tiempo, Scrum facilita una respuesta rápida a nuevas demandas, sin comprometer el progreso del proyecto.

El enfoque colaborativo de Scrum es ideal para un proyecto de este tipo. A través de reuniones frecuentes, como las planificaciones de sprint y las reuniones diarias, el equipo de desarrollo puede mantener una comunicación fluida, identificar problemas de manera oportuna y asegurarse de que las expectativas del cliente se cumplan en cada fase.

El trabajo en ciclos cortos (sprints) permite al equipo entregar versiones funcionales de la PWA de manera regular, lo que no solo reduce riesgos, sino que también permite probar y ajustar las características antes de la entrega final. Esto es fundamental para asegurar que la aplicación cumpla con las necesidades específicas de los usuarios, como la visualización de tareas en diferentes formatos.

Finalmente, la capacidad de inspección y adaptación continua de Scrum es un aspecto crucial, ya que en un equipo pequeño como el que desarrollará esta PWA, la retroalimentación constante es clave para mejorar la comunicación interna y asegurar una correcta alineación con los objetivos del proyecto.

# Framework de Desarrollo: React

Para el desarrollo de nuestra PWA de gestión de proyectos y tareas, hemos optado por usar React como framework principal. Esta decisión se basa en varias ventajas que lo hacen ideal para este proyecto.

Primero, React permite crear aplicaciones web progresivas que se comportan de manera similar a una aplicación nativa. Esto es crucial para nuestra PWA, ya que buscamos ofrecer una experiencia de usuario fluida y rápida, comparable a las aplicaciones móviles. Además, con React podemos optimizar el rendimiento de la aplicación mediante el uso del Virtual DOM, garantizando que las actualizaciones en tiempo real, como la creación de proyectos, la asignación de tareas y la visualización en listas o tableros Kanban, sean manejadas de forma eficiente.

Al trabajar con JavaScript, tanto en el frontend como en la lógica de la aplicación, aprovechamos el conocimiento previo del equipo y muchas de las bibliotecas que ya estamos utilizando. Esto no solo acelera el desarrollo, sino que también facilita la integración de funciones clave sin la necesidad de aprender un nuevo lenguaje o framework.

Otra gran ventaja es que React ofrece un rendimiento optimizado en la web, lo que nos permite manejar una gran cantidad de interacciones y actualizaciones sin comprometer la velocidad de la PWA. Esto es esencial para asegurar que los usuarios puedan gestionar sus proyectos y tareas de forma eficiente, con respuestas rápidas a cada acción.

# Esquema de versiona miento

El esquema de versiona miento que se va a utilizar para el desarrollo del proyecto será con
Git y GitHub. La rama principal, main, contendrá siempre el código estable y listo para
producción. Todas las funcionalidades nuevas o cambios se desarrollarán en ramas
específicas que partirán de una rama de desarrollo llamada develop. Para cada nueva
funcionalidad, se creará una rama con el prefijo feature/ y una breve descripción de la tarea,
como feature/nueva-funcionalidad.
Si se necesita corregir algún error en producción, se creara una rama hotfix/ desde main, y
una vez corregido, esa rama se fusionará tanto en main como en develop, para mantener el
código sincronizado.
