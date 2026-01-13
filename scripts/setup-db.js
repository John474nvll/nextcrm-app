
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Leyendo el archivo init.sql...');
  const sql = fs.readFileSync(path.join(__dirname, '..', 'init.sql'), 'utf8');
  
  console.log('Ejecutando el script SQL. Esto reiniciará la base de datos...');
  
  // Dividir el script en declaraciones individuales
  const statements = sql.split(/;\s*$/m).filter(s => s.trim().length > 0);

  for (const statement of statements) {
    try {
      await prisma.$executeRawUnsafe(`${statement};`);
    } catch (e) {
        // Ignorar el error "cannot drop schema public because it is required by the database system"
        if (!e.message.includes('cannot drop schema public')) {
            console.error('Error al ejecutar la declaración:', statement);
            console.error(e);
            throw e; // Detener si es otro tipo de error
        }
    }
  }

  console.log('¡Base de datos configurada con éxito!');
}

main()
  .catch((e) => {
    console.error('Ocurrió un error al configurar la base de datos:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
