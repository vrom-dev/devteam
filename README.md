# Developers Team

## Instruccions
- Forma un equip amb 2 desenvolupadors més que estiguin en aquest mateix Sprint (el mentor pot ajudar-te o suggerir-te companys). Haureu de construir el projecte TO-DO. Ha de satisfer els següents requisits:

- Creeu una aplicació que permeti portar un llistat de tasques per fer. Ha de contemplar l'opció d'afegir tasques, llistar-les i mostrar el seu estat (pendents, en execució o acabades), i l'hora d'inici i fi de la tasca, així com l'usuari que la va donar d'alta
- S'ha d'utilitzar per línia de comandos, i ha de contenir les següents opcions: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les tasques o llistar una tasca específica
- Heu d'utilitzar un repositori github seguint la seqüència gitflow

### Nivell 1
- Utilitzeu com a persistència un file JSON
- El projecte haurà d'estar correctament configurat en Github en la seva estructura de carpetes i de branches

### Nivell 2
- Utilitzeu com a persistència Mysql

### Nivell 3
- Utilitzeu com a persistència MongoDB.

## Instrucciones para iniciar programa

### Variables de entorno e inicialización de BBDD
- Crear archivo .env en el root del proyecto e indicar el sistema de persistencia a utilizar ('json', 'mongodb', 'sql'). El contenido del archivo debe seguir este esquema:
```
BBDD=json
```
- Si se selecciona SQL como sistema de persistencia, añadir el user y password de la conexión SQL al .env:
```
BBDD=sql
user=root
password=1234
```
- Para inicializar la base de datos SQL ejecutar:
```bash
node app
```

- Abrir terminal y ejecutar:
```bash
npm install
```
### Comandos del programa

```bash
node commands create ## add todo task
node commands update ## update task
node commands find ## find task
node commands list ## list all task
node commands delete ## remove task
```